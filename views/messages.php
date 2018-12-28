<?php foreach ($messages as $message): ?>
    <div class="message">
        <span class="date"><?= date('d/m/Y H:i:s', strtotime($message['created_at'])) ?></span>
        <span class="user"><?= $message['username'] ?></span>
        <?= htmlspecialchars($message['message']) ?>
    </div>
<?php endforeach ?>