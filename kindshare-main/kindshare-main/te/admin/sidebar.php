<?php
// Admin sidebar with KindShare theme. Expects $active; falls back to session admin.
$adminUser = $conn->query("SELECT username, profile_picture FROM admins WHERE id = {$_SESSION['admin_id']}")->fetch_assoc();
$adminPfp = $adminUser && $adminUser['profile_picture'] ? asset($adminUser['profile_picture']) : asset('★.jpeg');
?>
<div class="side">
    <div class="sidenav">
        <div class="top">
            <div class="logo">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#06B6A4" stroke-width="2"/>
                    <path d="M8 12l2.5 2.5L16 9" stroke="#06B6A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>KindShare Admin</p>
            </div>
            <div class="links">
                <a href="dashboard.php" class="<?=$active==='dashboard'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M3 21h18V3H3v18zm4-4h10v-2H7v2zm0-4h10v-2H7v2zm0-4h10V7H7v2z"/></svg>
                    Dashboard
                </a>
                <a href="wallet.php" class="<?=$active==='wallet'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M21 7H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h18v-2h-2v-6h2V7zm-4 8H3V9h14v6zm-9-1h4v-4H8v4z"/></svg>
                    Wallet
                </a>
                <a href="users.php" class="<?=$active==='users'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
                    Users
                </a>
                <a href="posts.php" class="<?=$active==='posts'?'active':''?>">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M19 3H5v18l7-3 7 3V3z"/></svg>
                    Posts
                </a>
                <a href="logout.php">
                    <svg class="ic" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                    Logout
                </a>
            </div>
        </div>
        <div class="bottom">
            <div class="pfp">
                <img src="<?=$adminPfp?>" alt="">
            </div>
            <div class="txt">
                <p>@<?=$adminUser['username']?></p>
                <p style="color:#06B6A4;">Admin</p>
            </div>
        </div>
    </div>
</div>




