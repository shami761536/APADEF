<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}

$active = 'posts';
$id = (int)($_GET['id'] ?? 0);
$post = $conn->query("SELECT * FROM posts WHERE id = {$id}")->fetch_assoc();
if (!$post) {
    die('Post not found');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $caption = trim($_POST['caption'] ?? '');
    $stmt = $conn->prepare('UPDATE posts SET caption = ?, edited = 1, edited_at = NOW() WHERE id = ?');
    $stmt->bind_param('si', $caption, $id);
    $stmt->execute();
    $conn->query("INSERT INTO post_history(post_id, old_caption, edited_by, edited_by_id) VALUES ({$id}, '".$conn->real_escape_string($post['caption'])."', 'admin', {$_SESSION['admin_id']})");
    $conn->query("INSERT INTO admin_logs(admin_id, action_type, details) VALUES ({$_SESSION['admin_id']}, 'edit_post', 'post {$id}')");
    redirect('posts.php');
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
        <?php require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Edit post #<?=$post['id']?></h1>
                <p>Force edit caption on behalf of the user.</p>
            </div>
            <div class="page-wrap" style="width:90%;max-width:900px;">
                <div class="form-card">
                    <form method="post" class="form-stack">
                        <div>
                            <label class="label">Current image</label>
                            <div class="post-img" style="height:220px;"><img src="<?=asset($post['image_path'])?>" alt=""></div>
                        </div>
                        <div>
                            <label class="label">Caption</label>
                            <textarea name="caption" rows="4" class="input" style="resize:vertical;"><?=htmlspecialchars($post['caption'])?></textarea>
                        </div>
                        <button type="submit" class="don-btn" style="width:170px;">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

