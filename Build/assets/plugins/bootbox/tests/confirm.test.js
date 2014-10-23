(function() {
  describe("bootbox.confirm", function() {
    describe("basic usage tests", function() {
      describe("with one argument", function() {
        describe("where the argument is not an object", function() {
          beforeEach(function() {
            return this.create = function() {
              return bootbox.confirm("Are you sure?");
            };
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/confirm requires a callback/);
          });
        });
        return describe("where the argument is an object", function() {
          beforeEach(function() {
            var _this = this;
            this.options = {};
            return this.create = function() {
              return _this.dialog = bootbox.confirm(_this.options);
            };
          });
          describe("with a message property", function() {
            beforeEach(function() {
              return this.options.message = "Are you sure?";
            });
            return it("throws an error requiring a callback", function() {
              return expect(this.create).to["throw"](/confirm requires a callback/);
            });
          });
          describe("with a callback property", function() {
            describe("where the callback is not a function", function() {
              beforeEach(function() {
                return this.options.callback = "Are you sure?";
              });
              return it("throws an error requiring a callback", function() {
                return expect(this.create).to["throw"](/confirm requires a callback/);
              });
            });
            return describe("where the callback is a function", function() {
              beforeEach(function() {
                return this.options.callback = function() {
                  return true;
                };
              });
              return it("throws an error requiring a message", function() {
                return expect(this.create).to["throw"](/Please specify a message/);
              });
            });
          });
          return describe("with a message and a callback", function() {
            beforeEach(function() {
              return this.options = {
                callback: function() {
                  return true;
                },
                message: "Are you sure?"
              };
            });
            it("does not throw an error", function() {
              return expect(this.create).not.to["throw"](Error);
            });
            it("creates a dialog object", function() {
              return expect(this.dialog).to.be.an("object");
            });
            it("adds the correct button labels", function() {
              expect(this.dialog.find(".btn:first").text()).to.equal("Cancel");
              return expect(this.dialog.find(".btn:last").text()).to.equal("OK");
            });
            return it("adds the correct button classes", function() {
              expect(this.dialog.find(".btn:first").hasClass("btn-default")).to.be["true"];
              return expect(this.dialog.find(".btn:last").hasClass("btn-primary")).to.be["true"];
            });
          });
        });
      });
      return describe("with two arguments", function() {
        describe("where the second argument is not a function", function() {
          beforeEach(function() {
            var _this = this;
            return this.create = function() {
              return _this.dialog = bootbox.confirm("Are you sure?", "callback here");
            };
          });
          return it("throws an error requiring a callback", function() {
            return expect(this.create).to["throw"](/confirm requires a callback/);
          });
        });
        return describe("where the second argument is a function", function() {
          beforeEach(function() {
            var _this = this;
            return this.create = function() {
              return _this.dialog = bootbox.confirm("Are you sure?", function() {
                return true;
              });
            };
          });
          it("does not throw an error", function() {
            return expect(this.create).not.to["throw"](Error);
          });
          it("creates a dialog object", function() {
            return expect(this.dialog).to.be.an("object");
          });
          it("applies the bootbox-confirm class to the dialog", function() {
            return expect(this.dialog.hasClass("bootbox-confirm")).to.be["true"];
          });
          it("adds the correct button labels", function() {
            expect(this.dialog.find(".btn:first").text()).to.equal("Cancel");
            return expect(this.dialog.find(".btn:last").text()).to.equal("OK");
          });
          it("adds the correct button classes", function() {
            expect(this.dialog.find(".btn:first").hasClass("btn-default")).to.be["true"];
            return expect(this.dialog.find(".btn:last").hasClass("btn-primary")).to.be["true"];
          });
          return it("shows the dialog", function() {
            return expect(this.dialog.is(":visible")).to.be["true"];
          });
        });
      });
    });
    describe("configuration options tests", function() {
      beforeEach(function() {
        var _this = this;
        this.options = {
          message: "Are you sure?",
          callback: function() {
            return true;
          }
        };
        return this.create = function() {
          return _this.dialog = bootbox.confirm(_this.options);
        };
      });
      describe("with a custom cancel button", function() {
        beforeEach(function() {
          this.options.buttons = {
            cancel: {
              label: "Custom cancel",
              className: "btn-danger"
            }
          };
          this.create();
          return this.button = this.dialog.find(".btn:first");
        });
        return it("adds the correct cancel button", function() {
          expect(this.button.text()).to.equal("Custom cancel");
          return expect(this.button.hasClass("btn-danger")).to.be["true"];
        });
      });
      describe("with a custom confirm button", function() {
        beforeEach(function() {
          this.options.buttons = {
            confirm: {
              label: "Custom confirm",
              className: "btn-warning"
            }
          };
          this.create();
          return this.button = this.dialog.find(".btn:last");
        });
        return it("adds the correct confirm button", function() {
          expect(this.button.text()).to.equal("Custom confirm");
          return expect(this.button.hasClass("btn-warning")).to.be["true"];
        });
      });
      return describe("with an unrecognised button key", function() {
        beforeEach(function() {
          return this.options.buttons = {
            "Bad key": {
              label: "Custom confirm",
              className: "btn-warning"
            }
          };
        });
        return it("throws an error", function() {
          return expect(this.create).to["throw"](/key is not allowed/);
        });
      });
    });
    return describe("callback tests", function() {
      describe("with a simple callback", function() {
        beforeEach(function() {
          this.callback = sinon.spy();
          this.dialog = bootbox.confirm({
            message: "Are you sure?",
            callback: this.callback
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        describe("when dismissing the dialog by clicking OK", function() {
          beforeEach(function() {
            return this.dialog.find(".btn-primary").trigger("click");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(true);
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
        describe("when dismissing the dialog by clicking Cancel", function() {
          beforeEach(function() {
            return this.dialog.find(".btn-default").trigger("click");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(false);
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
        return describe("when triggering the escape event", function() {
          beforeEach(function() {
            return this.dialog.trigger("escape.close.bb");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(false);
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
      });
      return describe("with a callback which returns false", function() {
        beforeEach(function() {
          this.callback = sinon.stub();
          this.callback.returns(false);
          this.dialog = bootbox.confirm({
            message: "Are you sure?",
            callback: this.callback
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        describe("when dismissing the dialog by clicking OK", function() {
          beforeEach(function() {
            return this.dialog.find(".btn-primary").trigger("click");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(true);
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
        describe("when dismissing the dialog by clicking Cancel", function() {
          beforeEach(function() {
            return this.dialog.find(".btn-default").trigger("click");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(false);
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
        return describe("when triggering the escape event", function() {
          beforeEach(function() {
            return this.dialog.trigger("escape.close.bb");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(false);
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
      });
    });
  });

}).call(this);
