class Api::UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find_by_id(params[:id])
        if @user.nil?
            render json: "Can't find user"
        else
           render "api/users/show" 
        end
    end

    def destroy
        @user = User.find_by_id(params[:id])

        if @user.nil?
            render json: "Can't find user"
        else
            @user.destroy
        end
    end

    private

    def user_params
        params.permit(:username, :email, :password, :money)
    end
end
