<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$active = 'upload';
$msg = '';
$status = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $caption = trim($_POST['caption'] ?? '');
    if (!empty($_FILES['photo']['name'])) {
        $file = $_FILES['photo'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $newName = 'uploads/' . time() . '_' . rand(1000, 9999) . '.' . $ext;
        if (move_uploaded_file($file['tmp_name'], __DIR__ . '/../' . $newName)) {
            $stmt = $conn->prepare('INSERT INTO posts (user_id, image_path, caption) VALUES (?, ?, ?)');
            $stmt->bind_param('iss', $_SESSION['user_id'], $newName, $caption);
            $stmt->execute();
            $status = 'success';
            $msg = 'Post published — now live in the feed.';
        } else {
            $status = 'error';
            $msg = 'Upload failed';
        }
    } else {
        $status = 'error';
        $msg = 'Please choose a photo';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Post</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php $uid = $_SESSION['user_id']; require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>New post</h1>
                <p>Share your story with the community—add a photo and a clear caption.</p>
            </div>
            <div class="page-wrap" style="width:90%;max-width:980px;">
                <?php if ($msg): ?>
                    <div class="alert <?=$status==='success'?'success':'error'?>"><?=$msg?></div>
                <?php endif; ?>
                <div class="form-card" style="width:100%;">
                    <div class="section-head">
                        <div>
                            <p class="label" style="margin:0;">Post details</p>
                            <p class="muted">Add an image and a short caption to describe what you are raising for.</p>
                        </div>
                        <span class="badge-muted">Draft</span>
                    </div>
                    <form method="post" enctype="multipart/form-data" class="form-stack" id="uploadForm">
                        <div>
                            <div class="label-row">
                                <label class="label">Image</label>
                                <span class="muted">Required</span>
                            </div>
                            <label class="dropzone">
                                <input type="file" name="photo" accept="image/*" required id="photoInput">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <div class="preview">
                                        <img id="previewImg" class="preview-thumb" src="<?=asset('★.jpeg')?>" alt="preview">
                                    </div>
                                    <div>
                                        <p style="margin:0;font-weight:700;font-size:13px;">Click to upload or drag and drop</p>
                                        <p class="muted" style="margin:2px 0;">JPG, PNG up to 10 MB. Recommended 1200x800px.</p>
                                        <p class="muted" style="margin:0;">This image will appear at the top of your post in the feed.</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div>
                            <div class="label-row">
                                <label class="label">Caption</label>
                                <span class="muted">Required • Min 10 characters</span>
                            </div>
                            <textarea name="caption" rows="4" class="input" style="resize:vertical;" placeholder="Describe what this donation will help with, who benefits, and any important context" required></textarea>
                            <p class="muted" style="margin-top:6px;">Keep it short and clear. You can edit this later from your profile.</p>
                        </div>
                        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
                            <button type="submit" class="don-btn" style="width:170px;">Submit post</button>
                            <a class="view-btn" href="feed.php">Cancel</a>
                            <span class="muted">All posts are reviewed for safety and may take a few minutes to appear.</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        const input = document.getElementById('photoInput');
        const preview = document.getElementById('previewImg');
        input.addEventListener('change', e => {
            const [file] = input.files;
            if (file) {
                preview.src = URL.createObjectURL(file);
            }
        });
    </script>
</body>
</html>

