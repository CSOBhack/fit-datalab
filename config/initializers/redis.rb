require 'redic'
require 'ohm'

$redis = Redic.new("redis://localhost:6379/1")

Ohm.redis = $redis

require 'ion'
Ion.connect url: 'redis://127.0.0.1:6379/1'