<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$uid = $_SESSION['user_id'];
$active = 'feed';
$posts = $conn->query("SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feed</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php $uid = $_SESSION['user_id']; require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Feed</h1>
                <p>Explore posts from community and support causes you care about</p>
            </div>
            <div class="feed-filter">
                <p class="loading">Loading new posts for you</p>
                <div class="progress-bar"><div class="progress-fill"></div></div>
                <div class="info-tabs">
                    <div class="left-info"><p>Showing latest posts • Updated just now</p></div>
                    <div class="right-tabs">
                        <a class="active" href="feed.php">All posts</a>
                        <a href="feed.php?mine=1">My posts</a>
                    </div>
                </div>
            </div>
            <div class="posts">
                <?php if ($posts->num_rows === 0): ?>
                    <p>No posts yet. Create your first post!</p>
                <?php endif; ?>
                <?php while ($row = $posts->fetch_assoc()): ?>
                    <?php if (isset($_GET['mine']) && $row['user_id'] != $uid) continue; ?>
                    <?php $img = $row['image_path'] ? asset($row['image_path']) : asset('★.jpeg'); ?>
                    <div class="post-card">
                        <div class="post-img" style="max-height:260px;">
                            <img src="<?=$img?>" alt="" style="width:100%;height:100%;object-fit:cover;">
                        </div>
                        <div class="post-info">
                            <div class="post-title"><?=htmlspecialchars($row['caption'])?></div>
                            <div class="post-meta">
                                <p>Posted by <span>@<?=htmlspecialchars($row['username'])?></span> • <?=date('M d, Y H:i', strtotime($row['created_at']))?></p>
                                <p><?=number_format($conn->query("SELECT COUNT(*) FROM donations WHERE post_id = {$row['id']}")->fetch_row()[0])?> supporters</p>
                            </div>
                            <div class="post-bottom">
                                <div class="balance">
                                    Balance: <span><?=number_format($row['total_donations'],2)?></span>
                                </div>
                                <div class="actions">
                                    <button class="don-btn" type="button">Donate</button>
                                    <a href="post_detail.php?id=<?=$row['id']?>" class="view-btn">View more details</a>
                                    <?php if ($row['user_id'] == $uid): ?>
                                        <a href="post_edit.php?id=<?=$row['id']?>" class="view-btn">Edit</a>
                                        <a href="post_delete.php?id=<?=$row['id']?>" class="view-btn" onclick="return confirm('Delete this post?')">Delete</a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
            <p class="pa">You've reached the end of feed, we'll notify you for more posts</p>
        </div>
    </div>
</body>
</html>

