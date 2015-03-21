require 'grape'

class API < Grape::API
  prefix 'v1'
  format :json
  mount Hckv1::Systems
  mount Hckv1::Nodes
end