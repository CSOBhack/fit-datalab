require 'ohm'

class Node < Ohm::Model

  attribute :id
  attribute :active_users
  attribute :created_at
  attribute :ip_address
  attribute :lft
  attribute :node_type
  attribute :parent_id
  attribute :rgt
  attribute :venue_address
  attribute :venue_lat
  attribute :venue_long
  attribute :venue_name

  index :id
end
