(function() {
  describe("bootbox.dialog", function() {
    beforeEach(function() {
      this.find = function(s) {
        return this.dialog.find(s);
      };
      this.exists = function(s) {
        return this.find(s).length !== 0;
      };
      this["class"] = function(s, c) {
        return this.find(s).hasClass(c);
      };
      this.invoke = function(s, m) {
        return this.find(s)[m]();
      };
      this.text = function(s) {
        return this.invoke(s, "text");
      };
      return this.html = function(s) {
        return this.invoke(s, "html");
      };
    });
    describe("invalid usage tests", function() {
      describe("with no arguments", function() {
        beforeEach(function() {
          return this.create = function() {
            return bootbox.dialog();
          };
        });
        return it("throws an error", function() {
          return expect(this.create).to["throw"](/supply an object/);
        });
      });
      return describe("with one argument", function() {
        describe("where the argument is not an object", function() {
          beforeEach(function() {
            return this.create = function() {
              return bootbox.dialog("test");
            };
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/supply an object/);
          });
        });
        describe("where the argument has no message property", function() {
          beforeEach(function() {
            return this.create = function() {
              return bootbox.dialog({
                invalid: "options"
              });
            };
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/specify a message/);
          });
        });
        return describe("where the argument has a button with an invalid value", function() {
          beforeEach(function() {
            return this.create = function() {
              return bootbox.dialog({
                message: "test",
                buttons: {
                  ok: "foo"
                }
              });
            };
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/button with key ok must be an object/);
          });
        });
      });
    });
    describe("when creating a minimal dialog", function() {
      beforeEach(function() {
        return this.dialog = bootbox.dialog({
          message: "test"
        });
      });
      it("adds the bootbox class to the dialog", function() {
        return expect(this.dialog.hasClass("bootbox")).to.be["true"];
      });
      it("adds the bootstrap modal class to the dialog", function() {
        return expect(this.dialog.hasClass("modal")).to.be["true"];
      });
      it("adds the fade class to the dialog", function() {
        return expect(this.dialog.hasClass("fade")).to.be["true"];
      });
      it("shows the expected message", function() {
        return expect(this.text(".bootbox-body")).to.equal("test");
      });
      it("does not have a header", function() {
        return expect(this.exists(".modal-header")).not.to.be.ok;
      });
      it("has a close button inside the body", function() {
        return expect(this.exists(".modal-body .close")).to.be.ok;
      });
      it("does not have a footer", function() {
        return expect(this.exists(".modal-footer")).not.to.be.ok;
      });
      return it("has a backdrop", function() {
        return expect(this.dialog.next(".modal-backdrop").length).to.equal(1);
      });
    });
    describe("when creating a dialog with a button", function() {
      beforeEach(function() {
        var _this = this;
        return this.create = function(button) {
          if (button == null) {
            button = {};
          }
          return _this.dialog = bootbox.dialog({
            message: "test",
            buttons: {
              one: button
            }
          });
        };
      });
      describe("when the button has no callback", function() {
        beforeEach(function() {
          this.create({
            label: "My Label"
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        it("shows a footer", function() {
          return expect(this.exists(".modal-footer")).to.be.ok;
        });
        it("shows one button", function() {
          return expect(this.find(".btn").length).to.equal(1);
        });
        it("shows the correct button text", function() {
          return expect(this.text(".btn")).to.equal("My Label");
        });
        it("applies the correct button class", function() {
          return expect(this["class"](".btn", "btn-primary")).to.be["true"];
        });
        describe("when triggering the escape event", function() {
          beforeEach(function() {
            return this.dialog.trigger("escape.close.bb");
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
        return describe("when clicking the close button", function() {
          beforeEach(function() {
            return this.dialog.find(".close").trigger("click");
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
      });
      describe("when the button has a label and callback", function() {
        beforeEach(function() {
          this.callback = sinon.spy();
          this.create({
            label: "Another Label",
            callback: this.callback
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        it("shows a footer", function() {
          return expect(this.exists(".modal-footer")).to.be.ok;
        });
        it("shows the correct button text", function() {
          return expect(this.text(".btn")).to.equal("Another Label");
        });
        describe("when dismissing the dialog by clicking OK", function() {
          beforeEach(function() {
            return this.dialog.find(".btn-primary").trigger("click");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
        describe("when triggering the escape event", function() {
          beforeEach(function() {
            return this.dialog.trigger("escape.close.bb");
          });
          it("should not invoke the callback", function() {
            return expect(this.callback).not.to.have.been.called;
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
        return describe("when clicking the close button", function() {
          beforeEach(function() {
            return this.dialog.find(".close").trigger("click");
          });
          it("should not invoke the callback", function() {
            return expect(this.callback).not.to.have.been.called;
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.called;
          });
        });
      });
      describe("when the button has a custom class", function() {
        beforeEach(function() {
          return this.create({
            label: "Test Label",
            className: "btn-custom"
          });
        });
        it("shows the correct button text", function() {
          return expect(this.text(".btn")).to.equal("Test Label");
        });
        return it("adds the custom class to the button", function() {
          return expect(this["class"](".btn", "btn-custom")).to.be["true"];
        });
      });
      return describe("when the button has no explicit label", function() {
        beforeEach(function() {
          return this.create = function(buttons) {
            return this.dialog = bootbox.dialog({
              message: "test",
              buttons: buttons
            });
          };
        });
        describe("when its value is an object", function() {
          beforeEach(function() {
            return this.create({
              "Short form": {
                className: "btn-custom",
                callback: function() {
                  return true;
                }
              }
            });
          });
          it("uses the key name as the button text", function() {
            return expect(this.text(".btn")).to.equal("Short form");
          });
          return it("adds the custom class to the button", function() {
            return expect(this["class"](".btn", "btn-custom")).to.be["true"];
          });
        });
        describe("when its value is a function", function() {
          beforeEach(function() {
            this.callback = sinon.spy();
            return this.create({
              my_label: this.callback
            });
          });
          it("uses the key name as the button text", function() {
            return expect(this.text(".btn")).to.equal("my_label");
          });
          return describe("when dismissing the dialog by clicking the button", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            return it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
          });
        });
        return describe("when its value is not an object or function", function() {
          beforeEach(function() {
            var _this = this;
            return this.badCreate = function() {
              return _this.create({
                "Short form": "hello world"
              });
            };
          });
          return it("throws an error", function() {
            return expect(this.badCreate).to["throw"](/button with key Short form must be an object/);
          });
        });
      });
    });
    describe("when creating a dialog with a title", function() {
      beforeEach(function() {
        return this.dialog = bootbox.dialog({
          title: "My Title",
          message: "test"
        });
      });
      it("has a header", function() {
        return expect(this.exists(".modal-header")).to.be.ok;
      });
      it("shows the correct title text", function() {
        return expect(this.text(".modal-title")).to.equal("My Title");
      });
      return it("has a close button inside the header", function() {
        return expect(this.exists(".modal-header .close")).to.be.ok;
      });
    });
    describe("when creating a dialog with no backdrop", function() {
      beforeEach(function() {
        return this.dialog = bootbox.dialog({
          message: "No backdrop in sight",
          backdrop: false
        });
      });
      return it("does not have a backdrop", function() {
        return expect(this.dialog.next(".modal-backdrop").length).to.equal(0);
      });
    });
    describe("when creating a dialog with no close button", function() {
      beforeEach(function() {
        return this.dialog = bootbox.dialog({
          message: "No backdrop in sight",
          closeButton: false
        });
      });
      return it("does not have a close button inside the body", function() {
        return expect(this.exists(".modal-body .close")).not.to.be.ok;
      });
    });
    describe("when creating a dialog with an onEscape handler", function() {
      beforeEach(function() {
        return this.e = function(keyCode) {
          return $(this.dialog).trigger($.Event("keyup", {
            which: keyCode
          }));
        };
      });
      describe("with a simple callback", function() {
        beforeEach(function() {
          this.callback = sinon.spy();
          this.dialog = bootbox.dialog({
            message: "Are you sure?",
            onEscape: this.callback
          });
          this.hidden = sinon.spy(this.dialog, "modal");
          return this.trigger = sinon.spy(this.dialog, "trigger").withArgs("escape.close.bb");
        });
        return describe("when triggering the keyup event", function() {
          describe("when the key is not the escape key", function() {
            beforeEach(function() {
              return this.e(15);
            });
            it("does not trigger the escape event", function() {
              return expect(this.trigger).not.to.have.been.called;
            });
            return it("should not hide the modal", function() {
              return expect(this.hidden).not.to.have.been.called;
            });
          });
          return describe("when the key is the escape key", function() {
            beforeEach(function() {
              return this.e(27);
            });
            it("triggers the escape event", function() {
              return expect(this.trigger).to.have.been.calledWithExactly("escape.close.bb");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
        });
      });
      return describe("with a callback which returns false", function() {
        beforeEach(function() {
          this.callback = sinon.stub().returns(false);
          this.dialog = bootbox.dialog({
            message: "Are you sure?",
            onEscape: this.callback
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        return describe("when triggering the escape keyup event", function() {
          beforeEach(function() {
            return this.e(27);
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
      });
    });
    return describe("with size option", function() {
      describe("when the size option is set to large", function() {
        beforeEach(function() {
          return this.dialog = bootbox.dialog({
            message: "test",
            size: "large"
          });
        });
        return it("adds the large class to the innerDialog", function() {
          return expect(this.dialog.children(":first").hasClass("modal-lg")).to.be["true"];
        });
      });
      return describe("when the size option is set to small", function() {
        beforeEach(function() {
          return this.dialog = bootbox.dialog({
            message: "test",
            size: "small"
          });
        });
        return it("adds the large class to the innerDialog", function() {
          return expect(this.dialog.children(":first").hasClass("modal-sm")).to.be["true"];
        });
      });
    });
  });

}).call(this);
