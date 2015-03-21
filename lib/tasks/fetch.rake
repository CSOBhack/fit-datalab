require 'rake'
require 'optparse'
require 'pp'
require 'hashie'
require 'redic'
require 'ion'
require_relative '../client'

def init_redis
  redis = Redic.new('redis://127.0.0.1:6379/1')
  Ohm.redis = redis
  Ion.connect url: 'redis://127.0.0.1:6379/1'
end

def parse_event(src)
  r = Event.find(event_id: src.event_id)
  if r.size > 0
    # update?
    event = r.first
  else
    event = Event.new(event_id: src.event_id)
    event.happened_at = src.happened_at
    event.save
  end
  src._embedded.each do |em|
    process_em(event, em)
  end
end

def process_em(event, em)
  #puts em.inspect
  data = em[1]
  self.send("p_#{em[0]}", event, em[1]) unless data.nil?
end

def p_actor(event, data)
  r = Actor.find(id: data.id)
  if r.size == 0
    a = Actor.new(id: data.id)
  else
    a = r.first
  end
  data.entries.each do |k, v|
    a.send "#{k}=", v
  end
  a.save
  event.actor = a
  event.save
end

def p_action(event, data)
  r = Action.find(id: data.id)
  if r.size == 0
    a = Action.new(id: data.id)
  else
    a = r.first
  end
  data.entries.each do |k, v|
    a.send "#{k}=", v
  end
  a.save
  event.action = a
  event.save
end

def p_node(event, data)
  r = Node.find(id: data.id)
  if r.size == 0
    a = Node.new(id: data.id)
  else
    a = r.first
  end
  data.entries.each do |k, v|
    a.send "#{k}=", v
  end
  a.save
  event.node = a
  event.save
end

def p_system(event, data)
  r = System.find(id: data.id)
  if r.size == 0
    a = System.new(id: data.id)
  else
    a = r.first
  end
  data.entries.each do |k, v|
    a.send "#{k}=", v
  end
  a.save
  event.system = a
  event.save
end
def p_layer(event, data)

end




namespace :hack do |args|
  desc "update traffic"
  task :update, [:limit] => :environment  do |t, args|
    cl = Hack::Client.new
    init_redis

    limit = args[:limit].to_i if !args[:limit].nil? && args[:limit].to_i > 0
    limit ||= 3
    i = 0
    per_page = 50
    all = limit * per_page
    page = 0

    puts "fetching traffic, total: #{all}, batch: #{limit}"
    pb = ProgressBar.create(:title => "Import", :starting_at => 0,
      :total => all,
     format: "%a |%b>>%i| %p%% %e Processed: %c")
    while page < limit
      items = cl.events(page)
      items.each do |it|
        h = Hashie::Mash.new it
        parse_event(h)
        pb.increment
        i += 1
      end
      page += 1
    end
  end

  desc "delete all Redis data"
  task :flush => :environment do |t, args|
    init_redis
    # removing all content from Redis
    Ohm.redis.call 'FLUSHALL'
  end
end