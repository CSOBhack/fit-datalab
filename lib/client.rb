require 'securerandom'
require 'digest/hmac'
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
      JSON.parse(r.body)
    end

  end
end