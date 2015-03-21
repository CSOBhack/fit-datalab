require 'ohm'

class Event < Ohm::Model

  attribute :event_id
  attribute :happened_at
  attribute :actor
  attribute :action
  attribute :node
  attribute :system

  index :event_id

end