require 'ohm'

class Actor < Ohm::Model

  attribute :id
  attribute :current_action_points
  attribute :goal
  attribute :name
  attribute :doing
  attribute :type

  index :id
end