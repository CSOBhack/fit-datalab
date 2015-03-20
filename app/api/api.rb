require 'grape'

class API < Grape::API
  prefix 'v1'
  format :json
  mount Hckv1::Ping
end