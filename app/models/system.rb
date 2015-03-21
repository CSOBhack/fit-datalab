require 'ohm'

class System < Ohm::Model

  attribute :id
  attribute :max_robustness
  attribute :name
  attribute :system_type_name
  attribute :user_capacity
  attribute :created_at
  attribute :level
  attribute :current_robustness

  index :id
end
