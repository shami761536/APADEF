<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}

$active = 'dashboard';
$totUsers = $conn->query('SELECT COUNT(*) FROM users')->fetch_row()[0];
$totPosts = $conn->query('SELECT COUNT(*) FROM posts')->fetch_row()[0];
$totDon = $conn->query('SELECT IFNULL(SUM(amount),0) FROM donations')->fetch_row()[0];
$latestUsers = $conn->query('SELECT username, created_at FROM users ORDER BY created_at DESC LIMIT 5');
$topPosts = $conn->query('SELECT p.id, u.username, p.total_donations FROM posts p JOIN users u ON u.id = p.user_id ORDER BY p.total_donations DESC LIMIT 5');
$totWallet = $conn->query('SELECT IFNULL(SUM(wallet_balance),0) FROM users')->fetch_row()[0];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Admin dashboard</h1>
                <p>Monitor users, posts, and donations with the same clean KindShare UI.</p>
            </div>
            <div class="page-wrap" style="width:90%;max-width:1100px;">
                <div class="stats-grid">
                    <div class="stat-card">
                        <p class="muted">Total users</p>
                        <div class="stat-value"><?=$totUsers?></div>
                    </div>
                    <div class="stat-card">
                        <p class="muted">Total posts</p>
                        <div class="stat-value"><?=$totPosts?></div>
                    </div>
                    <div class="stat-card">
                        <p class="muted">Total donations</p>
                        <div class="stat-value">$<?=number_format($totDon,2)?></div>
                    </div>
                    <div class="stat-card">
                        <p class="muted">Total user wallets</p>
                        <div class="stat-value">$<?=number_format($totWallet,2)?></div>
                    </div>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <p class="cc-title">Latest user registrations</p>
                        <?php while ($u = $latestUsers->fetch_assoc()): ?>
                            <div class="cc-row">
                                <p><?=$u['username']?></p>
                                <p class="cc-number"><?=date('M d', strtotime($u['created_at']))?></p>
                            </div>
                        <?php endwhile; ?>
                    </div>
                    <div class="stat-card">
                        <p class="cc-title">Top earning posts</p>
                        <?php while ($p = $topPosts->fetch_assoc()): ?>
                            <div class="cc-row">
                                <p>#<?=$p['id']?> by <?=$p['username']?></p>
                                <p class="cc-number">$<?=number_format($p['total_donations'],2)?></p>
                            </div>
                        <?php endwhile; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

