require "sinatra/config_file"
require 'sinatra/redis'
require 'json'
require 'haml'

class MashTube < Sinatra::Base

    register Sinatra::ConfigFile
    register Sinatra::Redis

    configure do
        set :port, ENV['PORT']
        config_file 'config.yml'
    end

    post '/save' do
        redis.hset("mashData", params[:name],  params[:data])
        content_type :json
        params[:data]
    end

    post '/vote/yes' do
        redis.incr("yes")
        content_type :json
        'ok'.to_json
    end

    post '/vote/no' do
        redis.incr("no")
        content_type :json
        'ok'.to_json
    end

    post '/submit' do
        userCounter = redis.incr("userCounter")
        redis.HSET("user", userCounter, {params[:email]=>params[:comment]}.to_json)
        content_type :json
        'ok'.to_json
    end

    get '/getmash/:mash' do
        content_type :json
        redis.hget('mashData', params[:mash])
    end

    get '/user' do
        content_type :json
        redis.hgetall("user").to_json
    end

    get '/imp' do
        content_type :json
        redis.get("impression").to_json
    end

    get '/?:mash?' do
        redis.incr("impression")
        haml :index, :locals => {:isDev => settings.isDev, :defaultMash => settings.defaultMash}
    end
end

MashTube.run!