/** Routes for lecture related operations 
  Following RESTful routing **/
module.exports = new function() {
  var _this = this;
  this.index = function(req,res){
    

  };

  this.create = function(req,res){
    //if req = GET

    //if req = POST
  }

  this.show = function(req,res){

  }

  this.update = function(req,res){
    //if req = GET

    //if req = POSt
  }

  this.destroy = function(req,res){
    
  }



  this.accountManagementHelp = function(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/help', {
        title: 'Help'
      });

    } else {
      response.redirect('/login/');
    }
  };

  return this;
};
