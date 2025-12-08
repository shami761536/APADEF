<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$uidSelf = $_SESSION['user_id'];
$uid = isset($_GET['user']) ? (int)$_GET['user'] : $uidSelf;
$active = 'profile';

$updateMsg = '';
$updateStatus = '';

// Handle profile update (bio + avatar) for self only
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['profile_update']) && $uid === $uidSelf) {
    $bio = trim($_POST['bio'] ?? '');
    $pfpPath = null;

    if (!empty($_FILES['pfp']['name'])) {
        $file = $_FILES['pfp'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $pfpPath = 'uploads/pfp_' . time() . '_' . rand(1000, 9999) . '.' . $ext;
        $uploadDir = __DIR__ . '/../uploads';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        if (!move_uploaded_file($file['tmp_name'], $uploadDir . '/' . basename($pfpPath))) {
            $pfpPath = null;
            $updateStatus = 'error';
            $updateMsg = 'Could not upload profile picture.';
        }
    }

    if ($updateMsg === '') {
        if ($pfpPath) {
            $stmt = $conn->prepare("UPDATE users SET bio = ?, profile_picture = ? WHERE id = ?");
            $stmt->bind_param('ssi', $bio, $pfpPath, $uidSelf);
        } else {
            $stmt = $conn->prepare("UPDATE users SET bio = ? WHERE id = ?");
            $stmt->bind_param('si', $bio, $uidSelf);
        }
        $stmt->execute();
        $stmt->close();
        $updateStatus = 'success';
        $updateMsg = 'Profile updated.';
    }
}

$user = $conn->query("SELECT * FROM users WHERE id = {$uid}")->fetch_assoc();
if (!$user) {
    die('User not found');
}

$posts = $conn->query("SELECT * FROM posts WHERE user_id = {$uid} ORDER BY created_at DESC");
$totalReceived = $conn->query("SELECT IFNULL(SUM(amount),0) FROM donations WHERE receiver_id = {$uid}")->fetch_row()[0];
$supporters = $conn->query("SELECT COUNT(DISTINCT donor_id) FROM donations WHERE receiver_id = {$uid}")->fetch_row()[0];
$pfp = $user['profile_picture'] ? asset($user['profile_picture']) : asset('★.jpeg');
?>

<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$updateMsg = '';
$updateStatus = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['profile_update'])) {
    $bio = trim($_POST['bio'] ?? '');
    $pfpPath = null;
    if (!empty($_FILES['pfp']['name'])) {
        $file = $_FILES['pfp'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $pfpPath = 'uploads/pfp_' . time() . '_' . rand(1000,9999) . '.' . $ext;
        $uploadDir = __DIR__ . '/../uploads';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        if (!move_uploaded_file($file['tmp_name'], $uploadDir . '/' . basename($pfpPath))) {
            $pfpPath = null;
            $updateStatus = 'error';
            $updateMsg = 'Could not upload profile picture.';
        }
    }
    if ($updateMsg === '') {
        if ($pfpPath) {
            $stmt = $conn->prepare("UPDATE users SET bio = ?, profile_picture = ? WHERE id = ?");
            $stmt->bind_param('ssi', $bio, $pfpPath, $_SESSION['user_id']);
        } else {
            $stmt = $conn->prepare("UPDATE users SET bio = ? WHERE id = ?");
            $stmt->bind_param('si', $bio, $_SESSION['user_id']);
        }
        $stmt->execute();
        $stmt->close();
        $updateStatus = 'success';
        $updateMsg = 'Profile updated.';
    }
}

$active = 'profile';
$uid = isset($_GET['user']) ? (int)$_GET['user'] : $_SESSION['user_id'];
$user = $conn->query("SELECT * FROM users WHERE id = {$uid}")->fetch_assoc();
if (!$user) {
    die('User not found');
}
$posts = $conn->query("SELECT * FROM posts WHERE user_id = {$uid} ORDER BY created_at DESC");
$totalReceived = $conn->query("SELECT IFNULL(SUM(amount),0) FROM donations WHERE receiver_id = {$uid}")->fetch_row()[0];
$supporters = $conn->query("SELECT COUNT(DISTINCT donor_id) FROM donations WHERE receiver_id = {$uid}")->fetch_row()[0];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <link rel="stylesheet" href="../new.css">
</head>
<body>
    <div class="container">
        <?php $uidSelf = $_SESSION['user_id']; require __DIR__ . '/sidebar.php'; ?>
        <div class="feed">
            <div class="header">
                <h1>Profile</h1>
                <p>View your public profile and manage posts</p>
            </div>
            <div class="page-wrap" style="width:90%;max-width:1100px;">
                <?php if ($updateMsg): ?>
                    <div class="alert <?=$updateStatus==='success'?'success':'error'?>"><?=$updateMsg?></div>
                <?php endif; ?>
                <div class="page-card">
                    <div class="profile-hero" style="align-items:flex-start;">
                        <div class="profile-main" style="gap:18px; align-items:flex-start;">
                            <?php $pfp = $user['profile_picture'] ? asset($user['profile_picture']) : asset('★.jpeg'); ?>
                            <div class="pfp" style="height:100px;width:100px;"><img class="pfp-img" src="<?=$pfp?>" alt=""></div>
                            <div>
                                <h2 style="margin:0;font-size:20px;"><?=$user['username']?></h2>
                                <p class="muted" style="margin:4px 0 8px 0;"><?=$user['bio'] ?: 'Add a short bio to introduce yourself.'?></p>
                                <div class="stat-row">
                                    <span>Posts <?=$posts->num_rows?></span>
                                    <span>Supporters <?=$supporters?></span>
                                    <span>Total received: $<?=number_format($totalReceived,2)?></span>
                                </div>
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <p class="muted" style="margin:0 0 4px 0;">Wallet balance</p>
                            <div class="stat-value" style="font-size:18px;">$<?=number_format($user['wallet_balance'],2)?></div>
                            <a class="view-btn" href="wallet.php" style="padding:10px 14px;border:1px solid #e5e7eb;border-radius:8px;display:inline-block;margin-top:8px;">Go to wallet</a>
                        </div>
                    </div>
                </div>

                <?php if ($uid === $uidSelf): ?>
                <div class="form-card" style="margin-top:12px;">
                    <div class="section-head">
                        <h3 style="margin:0;font-size:16px;">Update profile</h3>
                        <span class="muted">Upload your photo and bio</span>
                    </div>
                    <form method="post" enctype="multipart/form-data" class="form-stack">
                        <input type="hidden" name="profile_update" value="1">
                        <div>
                            <div class="label-row">
                                <label class="label">Profile picture</label>
                                <span class="muted">JPG/PNG up to 5MB</span>
                            </div>
                            <label class="dropzone" style="max-width:360px;">
                                <input type="file" name="pfp" accept="image/*" id="pfpInput">
                                <div style="display:flex;align-items:center;gap:10px;">
                                    <div id="pfpPreview" class="preview-thumb" style="width:64px;height:64px;border-radius:12px;background-size:cover;background-position:center;background-image:url('<?=$pfp?>');"></div>
                                    <div>
                                        <p style="margin:0;font-weight:700;font-size:13px;">Click to upload or drag and drop</p>
                                        <p class="muted" style="margin:2px 0;">Square images look best (min 400x400).</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label class="label">Bio</label>
                            <textarea name="bio" rows="3" class="input" style="resize:vertical;"><?=htmlspecialchars($user['bio'])?></textarea>
                        </div>
                        <div style="display:flex;gap:10px;align-items:center;">
                            <button type="submit" class="don-btn" style="width:150px;">Save profile</button>
                            <a class="view-btn" href="feed.php">Cancel</a>
                        </div>
                    </form>
                </div>
                <?php endif; ?>

                <div class="section-head" style="margin-top:18px;">
                    <h3 style="margin:0;">My posts</h3>
                    <?php if ($uid === $uidSelf): ?><a class="view-btn" href="post_upload.php">Upload new post</a><?php endif; ?>
                </div>
                <div class="page-card" style="padding:0;">
                    <?php while ($p = $posts->fetch_assoc()): ?>
                        <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid #f1f5f9;">
                            <div style="width:64px;height:64px;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
                                <img src="<?=asset($p['image_path'])?>" alt="" style="width:100%;height:100%;object-fit:cover;">
                            </div>
                            <div style="flex:1;">
                                <div style="font-weight:700;"><?=htmlspecialchars($p['caption'])?></div>
                                <div class="muted" style="margin-top:4px;">Created <?=date('M d, Y', strtotime($p['created_at']))?> • Donations: $<?=number_format($p['total_donations'],2)?> <?=$p['edited'] ? '• Edited' : ''?></div>
                            </div>
                            <?php if ($uid === $uidSelf): ?>
                                <div style="display:flex;gap:8px;align-items:center;">
                                    <a href="post_edit.php?id=<?=$p['id']?>" class="view-btn">Edit</a>
                                    <a href="post_delete.php?id=<?=$p['id']?>" class="view-btn" onclick="return confirm('Delete?')">Delete</a>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endwhile; ?>
                    <?php if ($posts->num_rows === 0): ?>
                        <div style="padding:16px;" class="muted">No posts yet.</div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <?php if ($uid === $uidSelf): ?>
    <script>
        const pfpInput = document.getElementById('pfpInput');
        const pfpPreview = document.getElementById('pfpPreview');
        if (pfpInput) {
            pfpInput.addEventListener('change', () => {
                const [file] = pfpInput.files;
                if (file) {
                    pfpPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
                    pfpPreview.style.backgroundSize = 'cover';
                    pfpPreview.style.backgroundPosition = 'center';
                }
            });
            <?php if ($user['profile_picture']): ?>
            pfpPreview.style.backgroundImage = "url('<?=asset($user['profile_picture'])?>')";
            pfpPreview.style.backgroundSize = 'cover';
            pfpPreview.style.backgroundPosition = 'center';
            <?php endif; ?>
        }
    </script>
    <?php endif; ?>
</body>
</html>

