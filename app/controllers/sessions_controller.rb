class SessionsController < ApplicationController

  def new
  end

  def create
    # Pulls the user out of the database using the submitted email address (User.find_by_email provided by ActiveRecord)
    user = User.find_by_email(params[:session][:email])

    # Possible results of user && user.authenticate(…):
    #   nonexistent	anything	        nil && [anything] == false
    #   valid user	wrong password	  true && false == false
    #   valid user	right password	  true && true == true
    if user && user.authenticate(params[:session][:password])
      # Sign the user in and redirect to the user's show page.
      sign_in user
      redirect_back_or user
    else
      flash.now[:error] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    sign_out
    redirect_to root_path
  end

end
