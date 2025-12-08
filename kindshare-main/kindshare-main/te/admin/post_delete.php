<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}

$id = (int)($_POST['id'] ?? 0);
if ($id) {
    // Clean dependent rows first to satisfy FK constraints
    $conn->query("DELETE FROM post_history WHERE post_id = {$id}");
    $conn->query("DELETE FROM donations WHERE post_id = {$id}");
    $conn->query("DELETE FROM wallet_transactions WHERE post_id = {$id}");
    $conn->query("DELETE FROM posts WHERE id = {$id}");
    $conn->query("INSERT INTO admin_logs(admin_id, action_type, details) VALUES ({$_SESSION['admin_id']}, 'delete_post', 'post {$id}')");
}
redirect('posts.php');




