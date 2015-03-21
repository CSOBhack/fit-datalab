#!/bin/ruby
require 'grape'

module Hckv1
  class Nodes < Grape::API
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

    get '/events' do
      client.events
    end

    get '/hackers' do
      client.hackers
    end

    get '/actors' do
      client.actors
    end

    resource 'traffic' do
      params do
        optional :limit, default: 20, type: Integer
        optional :offset, default: 0, type: Integer
        optional :page, default: 0, type: Integer
      end
      get '/' do
        # for simple pagination
        if params[:page] > 0
          per_page = params[:limit]
          params[:offset] = params[:page] * per_page
        end
        res = Event.all.sort(limit: [params[:offset], params[:limit]])
           #  .order(id: :asc)
        res.map do |e|
          {event_id: e.event_id, happened_at: e.happened_at}
        end
      end
    end


  end
end