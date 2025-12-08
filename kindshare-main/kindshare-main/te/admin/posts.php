<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}

$active = 'posts';
$order = $_GET['order'] ?? 'new';
$userFilter = trim($_GET['user'] ?? '');
$edited = $_GET['edited'] ?? '';
$don = $_GET['don'] ?? '';

$where = '1=1';
if ($userFilter !== '') {
    $esc = $conn->real_escape_string($userFilter);
    $where .= " AND u.username = '{$esc}'";
}
if ($edited === '1') {
    $where .= ' AND p.edited = 1';
}

switch ($don) {
    case 'high': $orderSql = 'p.total_donations DESC'; break;
    case 'low': $orderSql = 'p.total_donations ASC'; break;
    default:
        $orderSql = $order === 'old' ? 'p.created_at ASC' : 'p.created_at DESC';
}

$posts = $conn->query("SELECT p.*, u.username FROM posts p JOIN users u ON u.id = p.user_id WHERE {$where} ORDER BY {$orderSql}");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Posts</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Posts</h1>
                <p>Review, filter, edit, or delete any post with admin controls.</p>
            </div>
            <div class="page-wrap" style="width:90%;max-width:1100px;">
                <div class="page-card" style="margin-bottom:14px;">
                    <form method="get" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0;">
                        <input name="user" class="input" placeholder="Filter by username" value="<?=htmlspecialchars($userFilter)?>" style="max-width:200px;">
                        <select name="edited" class="input" style="max-width:160px;">
                            <option value="">Any</option>
                            <option value="1" <?= $edited==='1'?'selected':''; ?>>Edited only</option>
                        </select>
                        <select name="don" class="input" style="max-width:180px;">
                            <option value="">Donations (any)</option>
                            <option value="high" <?= $don==='high'?'selected':''; ?>>Highest</option>
                            <option value="low" <?= $don==='low'?'selected':''; ?>>Lowest</option>
                        </select>
                        <select name="order" class="input" style="max-width:150px;">
                            <option value="new" <?= $order==='new'?'selected':''; ?>>Newest</option>
                            <option value="old" <?= $order==='old'?'selected':''; ?>>Oldest</option>
                        </select>
                        <button class="don-btn" type="submit" style="padding:10px 14px;">Apply</button>
                    </form>
                </div>
                <div class="page-card" style="padding:0;">
                    <?php while ($p = $posts->fetch_assoc()): ?>
                        <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid #f1f5f9;">
                            <div style="width:72px;height:72px;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;flex-shrink:0;">
                                <img src="<?=asset($p['image_path'])?>" alt="" style="width:100%;height:100%;object-fit:cover;">
                            </div>
                            <div style="flex:1;">
                                <div style="font-weight:700;"><?=htmlspecialchars($p['caption'])?></div>
                                <div class="muted" style="margin-top:4px;">#<?=$p['id']?> by @<?=$p['username']?> • <?=date('M d, Y', strtotime($p['created_at']))?> <?=$p['edited']?'(edited)':''?></div>
                                <div class="muted" style="margin-top:2px;">Donations: $<?=number_format($p['total_donations'],2)?></div>
                            </div>
                            <div style="display:flex;gap:8px;align-items:center;">
                                <a href="post_edit.php?id=<?=$p['id']?>" class="view-btn">Force edit</a>
                                <form method="post" action="post_delete.php" onsubmit="return confirm('Delete post?')" style="margin:0;">
                                    <input type="hidden" name="id" value="<?=$p['id']?>">
                                    <button class="don-btn" type="submit" style="padding:8px 10px;">Delete</button>
                                </form>
                            </div>
                        </div>
                    <?php endwhile; ?>
                    <?php if ($posts->num_rows === 0): ?>
                        <div style="padding:16px;" class="muted">No posts found.</div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

