require 'httparty'
require 'net/https'
require 'uri'
require 'json'

module Hack
  class Client
    include HTTParty
    #debug_output

    def initialize(options={})
      @base_uri = options[:base_uri] ||= 'http://csob-hackathon.herokuapp.com/api/v1/'
    end

    def systems
      r = self.class.get(@base_uri + 'systems', query: {})
      JSON.parse(r.body)['_embedded']
    end

    def nodes
      r = self.class.get(@base_uri + 'nodes', query: {})
      JSON.parse(r.body)['_embedded']['nodes']
    end

    def events
      r = self.class.get(@base_uri + 'traffic', query: {})
      JSON.parse(r.body)['_embedded']['events']
    end

  end
end