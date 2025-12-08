<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}
$active = 'users';
$users = $conn->query("SELECT u.*, (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) AS post_count, (SELECT IFNULL(SUM(amount),0) FROM donations d WHERE d.receiver_id = u.id) AS received, (SELECT IFNULL(SUM(amount),0) FROM donations d2 WHERE d2.donor_id = u.id) AS sent FROM users u ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Users</h1>
                <p>Manage accounts, reset passwords, and remove users.</p>
            </div>
            <div class="page-wrap" style="width:90%;max-width:1100px;">
                <div class="page-card" style="padding:0;">
                    <?php while ($u = $users->fetch_assoc()): ?>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #f1f5f9;gap:12px;">
                            <div style="font-size:13px;line-height:1.5;color:#4b5563;">
                                <div style="font-weight:700;color:#111827;">@<?=$u['username']?></div>
                                <div><?=$u['email']?></div>
                                <div>Posts: <?=$u['post_count']?> • Received: $<?=number_format($u['received'],2)?> • Sent: $<?=number_format($u['sent'],2)?></div>
                                <div>Joined: <?=date('M d, Y', strtotime($u['created_at']))?> • Last login: <?=$u['last_login'] ?? 'never'?></div>
                            </div>
                            <div style="display:flex;gap:8px;align-items:center;flex-shrink:0;">
                                <form method="post" action="users_reset.php" style="display:flex;gap:6px;align-items:center;">
                                    <input type="hidden" name="id" value="<?=$u['id']?>">
                                    <input name="password" type="text" placeholder="new pass" required class="input" style="max-width:140px;font-size:12px;padding:8px;">
                                    <button class="don-btn" type="submit" style="padding:8px 12px;font-size:12px;">Reset</button>
                                </form>
                                <form method="post" action="users_delete.php" onsubmit="return confirm('Delete user?')" style="margin:0;">
                                    <input type="hidden" name="id" value="<?=$u['id']?>">
                                    <button class="don-btn" type="submit" style="padding:8px 12px;font-size:12px;background:#b91c1c;">Delete</button>
                                </form>
                            </div>
                        </div>
                    <?php endwhile; ?>
                    <?php if ($users->num_rows === 0): ?>
                        <div style="padding:16px;" class="muted">No users found.</div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

