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

    def events(page=0)
      r = self.class.get(@base_uri + 'traffic', query: {per_page: 50, page: page})
      JSON.parse(r.body)['_embedded']['events']
    end

    def hackers
      r = self.class.get(@base_uri + 'hackers', query: {})
      JSON.parse(r.body)['_embedded']['actors']
    end

    def actors
      r = self.class.get(@base_uri + 'actors', query: {})
      JSON.parse(r.body)['_embedded']['actors']
    end

  end
end