<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$uid = $_SESSION['user_id'];
$postId = (int)($_POST['post_id'] ?? 0);
$amount = (float)($_POST['amount'] ?? 0);

$post = $conn->query("SELECT user_id FROM posts WHERE id = {$postId}")->fetch_assoc();
if (!$post || $amount <= 0) {
    redirect('feed.php');
}

$conn->begin_transaction();
try {
    $conn->query("INSERT INTO donations(donor_id,receiver_id,post_id,amount) VALUES ({$uid}, {$post['user_id']}, {$postId}, {$amount})");
    $conn->query("UPDATE posts SET total_donations = total_donations + {$amount} WHERE id = {$postId}");
    $conn->query("UPDATE users SET wallet_balance = wallet_balance - {$amount} WHERE id = {$uid}");
    $conn->query("UPDATE users SET wallet_balance = wallet_balance + {$amount} WHERE id = {$post['user_id']}");
    $conn->query("INSERT INTO wallet_transactions(user_id,type,amount,post_id) VALUES ({$uid}, 'donation_sent', {$amount}, {$postId})");
    $conn->query("INSERT INTO wallet_transactions(user_id,type,amount,post_id) VALUES ({$post['user_id']}, 'donation_received', {$amount}, {$postId})");
    $conn->commit();
} catch (Throwable $e) {
    $conn->rollback();
}
redirect('feed.php');

