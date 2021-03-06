#!/bin/ruby
require 'grape'
LIB_PATH=File.expand_path('../../../lib', File.dirname(__FILE__))
require_relative LIB_PATH + '/client'

module Hckv1
  class Systems < Grape::API
    helpers do
      def client
        @cl ||= begin
          Hack::Client.new
        end
      end
    end

    resource 'systems' do
      params do
        optional :limit, default: 20, type: Integer
        optional :offset, default: 0, type: Integer
      end
      get '/' do
        client.systems
      end

    end
  end
end