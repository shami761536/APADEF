<?php
// Shared sidebar for user pages. Expects $conn and $uid set; fallback to session.
if (!isset($uid) && isset($_SESSION['user_id'])) {
    $uid = $_SESSION['user_id'];
}
$uid = (int)($uid ?? 0);
$walletData = $conn->query("SELECT wallet_balance, username, profile_picture FROM users WHERE id = {$uid}")->fetch_assoc();
$recv = $conn->query("SELECT COUNT(*) FROM donations WHERE receiver_id = {$uid}")->fetch_row()[0];
$sent = $conn->query("SELECT COUNT(*) FROM donations WHERE donor_id = {$uid}")->fetch_row()[0];
$active = $active ?? '';
$pfp = $walletData['profile_picture'] ? asset($walletData['profile_picture']) : asset('★.jpeg');
?>
<div class="side">
    <div class="sidenav">
        <div class="top">
            <div class="logo">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#06B6A4" stroke-width="2"/>
                    <path d="M8 12l2.5 2.5L16 9" stroke="#06B6A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>KindShare</p>
            </div>
            <div class="links">
                <a href="feed.php" class="<?=$active==='feed'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M3 21h18V3H3v18zm4-4h10v-2H7v2zm0-4h10v-2H7v2zm0-4h10V7H7v2z"/></svg>
                    Feed
                </a>
                <a href="post_upload.php" class="<?=$active==='upload'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M19 3H5v18l7-3 7 3V3z"/></svg>
                    Upload
                </a>
                <a href="wallet.php" class="<?=$active==='wallet'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    Wallet
                </a>
                <a href="profile.php" class="<?=$active==='profile'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
                    Profile
                </a>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <p class="cc-title">Wallet Overview</p>
                <div class="cc-row">
                    <p>Total Balance</p>
                    <p class="cc-value">$<?=number_format($walletData['wallet_balance'],2)?></p>
                </div>
                <div class="cc-row">
                    <p>Donations Received</p>
                    <p class="cc-number"><?=$recv?></p>
                </div>
                <div class="cc-row">
                    <p>Donations Sent</p>
                    <p class="cc-number"><?=$sent?></p>
                </div>
                <div class="cc-row">
                    <p>Pending Withdrawals</p>
                    <p class="cc-number">$0.00</p>
                </div>
                <a class="cc-link" href="wallet.php">View full history</a>
            </div>
        </div>
        <div class="bottom">
            <div class="pfp">
                <img src="<?=$pfp?>" alt="">
            </div>
            <div class="txt">
                <p>@<?=$walletData['username']?></p>
                <p><a href="logout.php" style="color:#06B6A4;text-decoration:none;">Log out</a></p>
            </div>
        </div>
    </div>
</div>

