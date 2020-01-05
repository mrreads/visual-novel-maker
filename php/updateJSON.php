<?php

$json = $_POST['json'];
$data = json_encode($json, JSON_UNESCAPED_UNICODE);
$data = stripslashes($data);
$data = substr($data, 1, -1);

file_put_contents( __DIR__ . './../resources/data/game.json', $data);

echo json_encode('save');