<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}
$active = 'wallet';

$totBalance = $conn->query("SELECT IFNULL(SUM(wallet_balance),0) FROM users")->fetch_row()[0];
$totDonations = $conn->query("SELECT IFNULL(SUM(amount),0) FROM donations")->fetch_row()[0];
$totalUsers = $conn->query("SELECT COUNT(*) FROM users")->fetch_row()[0];

$filter = $_GET['filter'] ?? 'all';
$where = "1=1";
if ($filter === 'received') {
    $where = "d.amount > 0";
}
$donations = $conn->query("
    SELECT d.*, pu.username AS donor, ru.username AS receiver, p.caption
    FROM donations d
    LEFT JOIN users pu ON pu.id = d.donor_id
    LEFT JOIN users ru ON ru.id = d.receiver_id
    LEFT JOIN posts p ON p.id = d.post_id
    WHERE {$where}
    ORDER BY d.created_at DESC
    LIMIT 200
");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Wallet</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Wallet oversight</h1>
                <p>Review all user balances and donations in one place.</p>
            </div>
            <div class="page-wrap" style="width:90%;max-width:1100px;">
                <div class="stats-grid">
                    <div class="stat-card">
                        <p class="muted">Total user balance</p>
                        <div class="stat-value">$<?=number_format($totBalance,2)?></div>
                    </div>
                    <div class="stat-card">
                        <p class="muted">Total donations</p>
                        <div class="stat-value">$<?=number_format($totDonations,2)?></div>
                    </div>
                    <div class="stat-card">
                        <p class="muted">Users</p>
                        <div class="stat-value"><?=$totalUsers?></div>
                    </div>
                </div>

                <div class="tab-row">
                    <a class="<?=$filter==='all'?'tab active':'tab'?>" href="?filter=all">All donations</a>
                    <a class="<?=$filter==='received'?'tab active':'tab'?>" href="?filter=received">Received</a>
                    <div style="flex:1;"></div>
                    <a class="muted" href="#" style="font-weight:600;">Export</a>
                </div>

                <div class="page-card">
                    <div class="table">
                        <div class="table-head">
                            <div>Date</div>
                            <div>Donor</div>
                            <div>Receiver</div>
                            <div>Post</div>
                            <div>Amount</div>
                        </div>
                        <?php if ($donations->num_rows === 0): ?>
                            <div class="table-row">
                                <div style="grid-column:1/6;color:#6b7280;">No donations yet.</div>
                            </div>
                        <?php endif; ?>
                        <?php while ($d = $donations->fetch_assoc()): ?>
                            <div class="table-row">
                                <div><?=date('M d, H:i', strtotime($d['created_at']))?></div>
                                <div>@<?=htmlspecialchars($d['donor'] ?? '—')?></div>
                                <div>@<?=htmlspecialchars($d['receiver'] ?? '—')?></div>
                                <div><?=htmlspecialchars($d['caption'] ?? '—')?></div>
                                <div class="pos">+$<?=number_format($d['amount'],2)?></div>
                            </div>
                        <?php endwhile; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

