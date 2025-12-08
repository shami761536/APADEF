<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$active = 'feed';
$id = (int)($_GET['id'] ?? 0);
$post = $conn->query("SELECT p.*, u.username, u.profile_picture FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = {$id}")->fetch_assoc();
if (!$post) {
    die('Post not found');
}
$img = $post['image_path'] ? asset($post['image_path']) : asset('★.jpeg');
$supporters = $conn->query("SELECT COUNT(*) FROM donations WHERE post_id = {$id}")->fetch_row()[0];
$donationTotal = $post['total_donations'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post details</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Post details</h1>
                <p>Full view of this post and its donation performance.</p>
            </div>
            <div class="page-wrap" style="width:92%;max-width:1100px;">
                <div class="page-card" style="display:grid;grid-template-columns:1.3fr 1fr;gap:16px;align-items:start;">
                    <div>
                        <div class="post-img" style="height:360px;">
                            <img src="<?=$img?>" alt="" style="width:100%;height:100%;object-fit:cover;">
                        </div>
                        <div class="post-info" style="padding:14px 0 0 0;">
                            <div class="post-title"><?=htmlspecialchars($post['caption'])?></div>
                            <div class="post-meta">
                                <p>Posted by <span>@<?=htmlspecialchars($post['username'])?></span> • <?=date('M d, Y H:i', strtotime($post['created_at']))?></p>
                                <p><?=$supporters?> supporters</p>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <div class="page-card" style="margin:0;">
                            <div style="display:flex;align-items:center;gap:12px;">
                                <div>
                                    <div style="font-weight:700;">@<?=htmlspecialchars($post['username'])?></div>
                                    <a class="view-btn" href="profile.php?user=<?=$post['user_id']?>">View profile</a>
                                </div>
                            </div>
                        </div>
                        <div class="page-card" style="margin:0;">
                            <p class="muted" style="margin:0 0 6px 0;">Total donations</p>
                            <div class="stat-value" style="font-size:22px;">$<?=number_format($donationTotal,2)?></div>
                            <p class="muted" style="margin:6px 0 0 0;"><?=$supporters?> supporters contributed</p>
                        </div>
                        <div class="page-card" style="margin:0;">
                            <button class="don-btn" type="button" style="width:100%;">Donate</button>
                            <p class="muted" style="margin-top:8px;">(Disabled in demo)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

