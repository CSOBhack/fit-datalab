#!/bin/ruby
require 'grape'

module Hckv1
  class Ping < Grape::API
    desc 'Returns pong.'
    get :ping do
      { ping: params[:pong] || 'pong' }
    end
  end
end