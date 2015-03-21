require 'grape'

class API < Grape::API
  prefix 'v1'
  format :json
  mount Hckv1::Ping
  mount Hckv1::System
end