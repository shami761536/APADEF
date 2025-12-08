<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$uid = $_SESSION['user_id'];
$active = 'upload';
$id = (int)($_GET['id'] ?? 0);
$post = $conn->query("SELECT * FROM posts WHERE id = {$id} AND user_id = {$uid}")->fetch_assoc();
if (!$post) {
    die('Post not found');
}

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $caption = trim($_POST['caption'] ?? '');
    $path = $post['image_path'];
    if (!empty($_FILES['photo']['name'])) {
        $file = $_FILES['photo'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $newName = 'uploads/' . time() . '_' . rand(1000, 9999) . '.' . $ext;
        if (move_uploaded_file($file['tmp_name'], __DIR__ . '/../' . $newName)) {
            $path = $newName;
        }
    }
    $stmt = $conn->prepare('UPDATE posts SET image_path = ?, caption = ?, edited = 1, edited_at = NOW() WHERE id = ? AND user_id = ?');
    $stmt->bind_param('ssii', $path, $caption, $id, $uid);
    $stmt->execute();
    redirect('feed.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Post</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php $uid = $_SESSION['user_id']; require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Edit post</h1>
                <p>Refresh your image or caption. We’ll tag it as edited.</p>
            </div>
            <div class="page-wrap">
                <?php if ($msg): ?><p class="pill" style="margin-bottom:10px;"><?=$msg?></p><?php endif; ?>
                <div class="page-card" style="max-width:780px;">
                    <form method="post" enctype="multipart/form-data" class="form-stack">
                        <div>
                            <label class="label">Current image</label>
                            <img src="<?=asset($post['image_path'])?>" style="max-width:320px;border-radius:8px;border:1px solid #e5e7eb;">
                        </div>
                        <div>
                            <label class="label">Change photo (optional)</label>
                            <input type="file" name="photo" accept="image/*" class="input" style="padding:12px;">
                        </div>
                        <div>
                            <label class="label">Caption</label>
                            <textarea name="caption" rows="4" class="input" style="resize:vertical;"><?=htmlspecialchars($post['caption'])?></textarea>
                        </div>
                        <div style="display:flex;gap:10px;align-items:center;">
                            <button type="submit" class="don-btn" style="width:170px;">Save changes</button>
                            <span class="muted">Changes are live immediately.</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

