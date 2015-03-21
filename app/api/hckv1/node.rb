#!/bin/ruby
require 'grape'

module Hckv1
  class Node < Grape::API
    helpers do
      def client
        @cl ||= begin
          Hack::Client.new
        end
      end
    end

    resource 'nodes' do
      params do
        optional :limit, default: 20, type: Integer
        optional :offset, default: 0, type: Integer
      end
      get '/' do
        client.nodes
      end

    end
  end
end