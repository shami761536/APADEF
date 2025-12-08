<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}
$uid = $_SESSION['user_id'];
$active = 'wallet';
$balanceRow = $conn->query("SELECT wallet_balance FROM users WHERE id = {$uid}")->fetch_row();
$balance = $balanceRow ? $balanceRow[0] : 0;
$totalReceived = $conn->query("SELECT IFNULL(SUM(amount),0) FROM wallet_transactions WHERE user_id = {$uid} AND type='donation_received'")->fetch_row()[0];
$totalSent = $conn->query("SELECT IFNULL(SUM(amount),0) FROM wallet_transactions WHERE user_id = {$uid} AND type='donation_sent'")->fetch_row()[0];
$onHold = 0.00;
$filter = $_GET['filter'] ?? 'all';
$where = "wt.user_id = {$uid}";
if ($filter === 'received') {
    $where .= " AND wt.type='donation_received'";
} elseif ($filter === 'sent') {
    $where .= " AND wt.type='donation_sent'";
}
$tx = $conn->query("
    SELECT wt.*, p.caption,
           d.donor_id, d.receiver_id,
           du.username AS donor_name,
           ru.username AS receiver_name
    FROM wallet_transactions wt
    LEFT JOIN donations d ON d.post_id = wt.post_id
    LEFT JOIN users du ON du.id = d.donor_id
    LEFT JOIN users ru ON ru.id = d.receiver_id
    LEFT JOIN posts p ON p.id = wt.post_id
    WHERE {$where}
    ORDER BY wt.created_at DESC
    LIMIT 100
");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Wallet</h1>
                <p>Track your donations, current balance, and transaction history.</p>
            </div>
            <div class="page-wrap">
                <span class="pill" style="margin-bottom:12px;display:inline-block;">Available balance: <?=number_format($balance,2)?></span>
                <div class="stats-grid">
                    <div class="stat-card">
                        <p class="muted">Current balance</p>
                        <div class="stat-value">$<?=number_format($balance,2)?></div>
                        <div class="muted">Ready to withdraw now based on completed donations.</div>
                        <div class="pill muted" style="background:#eef2f7;color:#4b5563;margin-top:8px;">On hold: <?=number_format($onHold,2)?></div>
                    </div>
                    <div class="stat-card">
                        <p class="muted">Total received</p>
                        <div class="stat-value">$<?=number_format($totalReceived,2)?></div>
                        <div class="muted">Across all of your public posts since you joined.</div>
                    </div>
                    <div class="stat-card">
                        <p class="muted">Total sent</p>
                        <div class="stat-value">$<?=number_format($totalSent,2)?></div>
                        <div class="muted">You can always see where you chose to contribute.</div>
                    </div>
                </div>

                <div class="tab-row">
                    <a class="<?=$filter==='all'?'tab active':'tab'?>" href="?filter=all">All transactions</a>
                    <a class="<?=$filter==='received'?'tab active':'tab'?>" href="?filter=received">Donations received</a>
                    <a class="<?=$filter==='sent'?'tab active':'tab'?>" href="?filter=sent">Donations sent</a>
                    <div style="flex:1;"></div>
                    <a class="muted" href="#" style="font-weight:600;">Export</a>
                    <a class="muted" href="#" style="font-weight:600;">Filter</a>
                </div>

                <div class="page-card">
                    <div class="table">
                        <div class="table-head">
                            <div>Date</div>
                            <div>Counterparty</div>
                            <div>Post</div>
                            <div>Amount</div>
                            <div>Type</div>
                        </div>
                        <?php if ($tx->num_rows === 0): ?>
                            <div class="table-row">
                                <div colspan="5" style="grid-column:1/6;color:#6b7280;">No transactions yet.</div>
                            </div>
                        <?php endif; ?>
                        <?php while ($t = $tx->fetch_assoc()): ?>
                            <?php
                                $counter = $t['type']==='donation_received' ? ($t['donor_name'] ?? '@supporter') : ($t['receiver_name'] ?? '@creator');
                                $typeLabel = $t['type']==='donation_received' ? 'Received' : 'Sent';
                                $badgeClass = $t['type']==='donation_received' ? 'badge-success' : 'badge-danger';
                            ?>
                            <div class="table-row">
                                <div><?=date('M d, H:i', strtotime($t['created_at']))?></div>
                                <div>@<?=htmlspecialchars($counter)?></div>
                                <div><?=htmlspecialchars($t['caption'] ?? '—')?></div>
                                <div class="<?= $t['type']==='donation_received' ? 'pos' : 'neg'; ?>">
                                    <?=$t['type']==='donation_received'?'+':'-'?>$<?=number_format($t['amount'],2)?>
                                </div>
                                <div><span class="<?=$badgeClass?>"><?=$typeLabel?></span></div>
                            </div>
                        <?php endwhile; ?>
                    </div>
                    <div class="muted" style="padding-top:10px;">As you receive and send more donations, they will appear in this list.</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

