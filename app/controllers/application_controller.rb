class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?

    # These methods work with the session and user controllers to control user login/access to site
    def fallback_index_html
        render :file => 'public/index.html'
    end

    def login!(user)
        session[:session_token] = user.session_token
    end

    def logout!
        current_user.reset_token!
        session[:session_token] = nil
    end
    
    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by_session_token(session[:session_token])
    end

    def logged_in?
        !current_user.nil?
    end

    def require_logged_out
        redirect_to user_url(current_user) if logged_in?
    end

    def require_logged_in
        redirect_to api_session unless logged_in?
    end

    def fallback_index_html
        render :file => 'public/index.html'
    end
end
