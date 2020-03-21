class Api::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def create
        @user = User.find_by_credentials(params[:username], params[:password])
        if @user
            login!(@user)
            render "api/users/show"
        else
            render json: ["invalid username/password combination"], status: 401
        end
    end

    def destroy
        if current_user
            logout!
            render json: {}
        else
            render json: "No one logged in!", status: 404
        end
    end
end
