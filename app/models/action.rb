require 'ohm'

class Action < Ohm::Model

  attribute :id
  attribute :name
  attribute :power
  attribute :price


  index :id
end

