(function() {
  describe("bootbox.prompt", function() {
    beforeEach(function() {
      window.bootbox = bootbox.init();
      this.find = function(selector) {
        return this.dialog.find(selector);
      };
      this.text = function(selector) {
        return this.find(selector).text();
      };
      return this.exists = function(selector) {
        return this.find(selector).length !== 0;
      };
    });
    describe("basic usage tests", function() {
      describe("with one argument", function() {
        describe("where the argument is not an object", function() {
          beforeEach(function() {
            return this.create = function() {
              return bootbox.prompt("What is your name?");
            };
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/prompt requires a callback/);
          });
        });
        return describe("where the argument is an object", function() {
          beforeEach(function() {
            var _this = this;
            this.options = {};
            return this.create = function() {
              return _this.dialog = bootbox.prompt(_this.options);
            };
          });
          describe("with a title property", function() {
            beforeEach(function() {
              return this.options.title = "What is your name?";
            });
            it("throws an error requiring a callback", function() {
              return expect(this.create).to["throw"](/prompt requires a callback/);
            });
            return describe("and a callback property", function() {
              return describe("where the callback is not a function", function() {
                beforeEach(function() {
                  return this.options.callback = "Not a function";
                });
                return it("throws an error requiring a callback", function() {
                  return expect(this.create).to["throw"](/prompt requires a callback/);
                });
              });
            });
          });
          describe("with a callback function", function() {
            beforeEach(function() {
              return this.options.callback = function() {
                return true;
              };
            });
            return it("throws an error requiring a title", function() {
              return expect(this.create).to["throw"](/prompt requires a title/);
            });
          });
          return describe("with a title and a callback", function() {
            beforeEach(function() {
              return this.options = {
                callback: function() {
                  return true;
                },
                title: "What is your name?"
              };
            });
            it("does not throw an error", function() {
              return expect(this.create).not.to["throw"](Error);
            });
            it("creates a dialog object", function() {
              return expect(this.dialog).to.be.an("object");
            });
            it("applies the bootbox-prompt class to the dialog", function() {
              return expect(this.dialog.hasClass("bootbox-prompt")).to.be["true"];
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
              return _this.dialog = bootbox.prompt("What is your name?", "callback here");
            };
          });
          return it("throws an error requiring a callback", function() {
            return expect(this.create).to["throw"](/prompt requires a callback/);
          });
        });
        return describe("where the second argument is a function", function() {
          beforeEach(function() {
            var _this = this;
            return this.create = function() {
              return _this.dialog = bootbox.prompt("What is your name?", function() {
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
          it("adds the correct button labels", function() {
            expect(this.text(".btn:first")).to.equal("Cancel");
            return expect(this.text(".btn:last")).to.equal("OK");
          });
          it("adds the correct button classes", function() {
            expect(this.dialog.find(".btn:first").hasClass("btn-default")).to.be["true"];
            return expect(this.dialog.find(".btn:last").hasClass("btn-primary")).to.be["true"];
          });
          it("adds the expected dialog title", function() {
            return expect(this.text("h4")).to.equal("What is your name?");
          });
          it("adds a close button", function() {
            return expect(this.dialog.find(".modal-header .close")).to.be.ok;
          });
          it("creates a form with a text input", function() {
            return expect(this.dialog.find("form input[type=text]")).to.be.ok;
          });
          it("with no default value", function() {
            return expect(this.dialog.find("form input[type=text]").val()).to.equal("");
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
          title: "What is your name?",
          callback: function() {
            return true;
          }
        };
        return this.create = function() {
          return _this.dialog = bootbox.prompt(_this.options);
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
      describe("with an unrecognised button key", function() {
        beforeEach(function() {
          return this.options.buttons = {
            prompt: {
              label: "Custom confirm",
              className: "btn-warning"
            }
          };
        });
        return it("throws an error", function() {
          return expect(this.create).to["throw"](/key prompt is not allowed/);
        });
      });
      describe("setting show to false", function() {
        beforeEach(function() {
          var _this = this;
          this.options.show = false;
          this.shown = sinon.spy();
          sinon.stub(bootbox, "dialog", function() {
            return {
              on: function() {},
              off: function() {},
              modal: _this.shown
            };
          });
          return this.create();
        });
        return it("does not show the dialog", function() {
          return expect(this.shown).not.to.have.been.called;
        });
      });
      describe("invalid prompt type", function() {
        beforeEach(function() {
          return this.options.inputType = 'foobar';
        });
        return it("throws an error", function() {
          return expect(this.create).to["throw"](/invalid prompt type/);
        });
      });
      describe("setting inputType text", function() {
        beforeEach(function() {
          return this.options.inputType = "text";
        });
        describe("without default value", function() {
          beforeEach(function() {
            return this.create();
          });
          it("shows text input ", function() {
            return expect(this.exists("input[type='text']")).to.be.ok;
          });
          return it("has proper class", function() {
            expect(this.find("input[type='text']").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("input[type='text']").hasClass("bootbox-input-text")).to.be.ok;
          });
        });
        describe("with default value", function() {
          beforeEach(function() {
            this.options.value = "John Smith";
            return this.create();
          });
          return it("has correct default value", function() {
            return expect(this.find("input[type='text']").val()).to.equal("John Smith");
          });
        });
        describe("with placeholder", function() {
          beforeEach(function() {
            this.options.placeholder = "enter your name";
            return this.create();
          });
          return it("has correct placeholder value", function() {
            return expect(this.find("input[type='text']").prop("placeholder")).to.equal("enter your name");
          });
        });
        return describe("with pattern", function() {
          beforeEach(function() {
            this.options.pattern = "\d{1,2}/\d{1,2}/\d{4}";
            return this.create();
          });
          return it("has correct pattern value", function() {
            return expect(this.find("input[type='text']").prop("pattern")).to.equal("\d{1,2}/\d{1,2}/\d{4}");
          });
        });
      });
      describe("setting inputType textarea", function() {
        beforeEach(function() {
          return this.options.inputType = "textarea";
        });
        describe("without default value", function() {
          beforeEach(function() {
            return this.create();
          });
          it("shows text input ", function() {
            return expect(this.exists("textarea")).to.be.ok;
          });
          return it("has proper class", function() {
            expect(this.find("textarea").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("textarea").hasClass("bootbox-input-textarea")).to.be.ok;
          });
        });
        describe("with default value", function() {
          beforeEach(function() {
            this.options.value = "Once upon a time...";
            return this.create();
          });
          return it("has correct default value", function() {
            return expect(this.find("textarea").val()).to.equal("Once upon a time...");
          });
        });
        return describe("with placeholder", function() {
          beforeEach(function() {
            this.options.placeholder = "enter your favorite fairy tale";
            return this.create();
          });
          return it("has correct placeholder value", function() {
            return expect(this.find("textarea").prop("placeholder")).to.equal("enter your favorite fairy tale");
          });
        });
      });
      describe("setting inputType email", function() {
        beforeEach(function() {
          return this.options.inputType = "email";
        });
        describe("without default value", function() {
          beforeEach(function() {
            return this.create();
          });
          it("shows email input ", function() {
            return expect(this.exists("input[type='email']")).to.be.ok;
          });
          return it("has proper class", function() {
            expect(this.find("input[type='email']").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("input[type='email']").hasClass("bootbox-input-email")).to.be.ok;
          });
        });
        describe("with default value", function() {
          beforeEach(function() {
            this.options.value = "john@smith.com";
            return this.create();
          });
          return it("has correct default value", function() {
            return expect(this.find("input[type='email']").val()).to.equal("john@smith.com");
          });
        });
        describe("with placeholder", function() {
          beforeEach(function() {
            this.options.placeholder = "enter your email";
            return this.create();
          });
          return it("has correct placeholder value", function() {
            return expect(this.find("input[type='email']").prop("placeholder")).to.equal("enter your email");
          });
        });
        return describe("with pattern", function() {
          beforeEach(function() {
            this.options.pattern = "\d{1,2}/\d{1,2}/\d{4}";
            return this.create();
          });
          return it("has correct pattern value", function() {
            return expect(this.find("input[type='email']").prop("pattern")).to.equal("\d{1,2}/\d{1,2}/\d{4}");
          });
        });
      });
      describe("setting inputType password", function() {
        beforeEach(function() {
          return this.options.inputType = "password";
        });
        describe("without default value", function() {
          beforeEach(function() {
            return this.create();
          });
          it("shows password input ", function() {
            return expect(this.exists("input[type='password']")).to.be.ok;
          });
          return it("has proper class", function() {
            expect(this.find("input[type='password']").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("input[type='password']").hasClass("bootbox-input-password")).to.be.ok;
          });
        });
        describe("with default value", function() {
          beforeEach(function() {
            this.options.value = "qwerty";
            return this.create();
          });
          return it("has correct default value", function() {
            return expect(this.find("input[type='password']").val()).to.equal("qwerty");
          });
        });
        return describe("with placeholder", function() {
          beforeEach(function() {
            this.options.placeholder = "enter your password";
            return this.create();
          });
          return it("has correct placeholder value", function() {
            return expect(this.find("input[type='password']").prop("placeholder")).to.equal("enter your password");
          });
        });
      });
      describe("setting inputType select", function() {
        describe("without options", function() {
          beforeEach(function() {
            return this.options.inputType = 'select';
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/prompt with select requires options/);
          });
        });
        describe("with invalid options", function() {
          beforeEach(function() {
            this.options.inputType = 'select';
            return this.options.inputOptions = 'foo';
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/given options in wrong format/);
          });
        });
        describe("with empty options", function() {
          beforeEach(function() {
            this.options.inputType = 'select';
            return this.options.inputOptions = [];
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/prompt with select requires options/);
          });
        });
        describe("with options in wrong format", function() {
          beforeEach(function() {
            this.options.inputType = 'select';
            return this.options.inputOptions = [
              {
                foo: 'bar'
              }
            ];
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/given options in wrong format/);
          });
        });
        describe("with a value but no text", function() {
          beforeEach(function() {
            this.options.inputType = 'select';
            return this.options.inputOptions = [
              {
                value: 'bar'
              }
            ];
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/given options in wrong format/);
          });
        });
        describe("with an invalid second options", function() {
          beforeEach(function() {
            this.options.inputType = 'select';
            return this.options.inputOptions = [
              {
                value: "bar",
                text: "bar"
              }, {
                text: "foo"
              }
            ];
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/given options in wrong format/);
          });
        });
        describe("with valid options", function() {
          beforeEach(function() {
            this.options.inputType = "select";
            this.options.inputOptions = [
              {
                value: 1,
                text: 'foo'
              }, {
                value: 2,
                text: 'bar'
              }, {
                value: 3,
                text: 'foobar'
              }
            ];
            return this.create();
          });
          it("shows select input", function() {
            return expect(this.exists("select")).to.be.ok;
          });
          it("has proper class", function() {
            expect(this.find("select").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("select").hasClass("bootbox-input-select")).to.be.ok;
          });
          return it("with three options", function() {
            return expect(this.find("option").length).to.equal(3);
          });
        });
        describe("with zero as the first option", function() {
          beforeEach(function() {
            this.options.inputType = "select";
            this.options.inputOptions = [
              {
                value: 0,
                text: "foo"
              }
            ];
            return this.create();
          });
          return it("shows the select input", function() {
            return expect(this.exists("select")).to.be.ok;
          });
        });
        describe("with false as the first option", function() {
          beforeEach(function() {
            this.options.inputType = "select";
            this.options.inputOptions = [
              {
                value: false,
                text: "foo"
              }
            ];
            return this.create();
          });
          return it("shows the select input", function() {
            return expect(this.exists("select")).to.be.ok;
          });
        });
        return describe("with option groups", function() {
          beforeEach(function() {
            this.options.inputType = 'select';
            this.options.inputOptions = [
              {
                value: 1,
                group: 'foo',
                text: 'foo'
              }, {
                value: 2,
                group: 'bar',
                text: 'bar'
              }, {
                value: 3,
                group: 'foo',
                text: 'foobar'
              }, {
                value: 4,
                group: 'bar',
                text: 'barfoo'
              }
            ];
            return this.create();
          });
          it("shows select input", function() {
            return expect(this.exists("select")).to.be.ok;
          });
          it("has proper class", function() {
            expect(this.find("select").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("select").hasClass("bootbox-input-select")).to.be.ok;
          });
          it("with two option group", function() {
            return expect(this.find("optgroup").length).to.equal(2);
          });
          return it("with four options", function() {
            return expect(this.find("option").length).to.equal(4);
          });
        });
      });
      describe("setting inputType checkbox", function() {
        describe("without options", function() {
          beforeEach(function() {
            return this.options.inputType = 'checkbox';
          });
          return it("throws an error", function() {
            return expect(this.create).to["throw"](/prompt with checkbox requires options/);
          });
        });
        return describe("with options", function() {
          beforeEach(function() {
            this.options.inputType = 'checkbox';
            this.options.inputOptions = [
              {
                value: 1,
                text: 'foo'
              }, {
                value: 2,
                text: 'bar'
              }, {
                value: 3,
                text: 'foobar'
              }
            ];
            return this.create();
          });
          it("shows checkbox input", function() {
            return expect(this.exists("input[type='checkbox']")).to.be.ok;
          });
          it("has proper class", function() {
            expect(this.find("input[type='checkbox']").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("input[type='checkbox']").hasClass("bootbox-input-checkbox")).to.be.ok;
          });
          return it("with three checkboxes", function() {
            return expect(this.find("input[type='checkbox']").length).to.equal(3);
          });
        });
      });
      describe("setting inputType date", function() {
        beforeEach(function() {
          return this.options.inputType = "date";
        });
        describe("without default value", function() {
          beforeEach(function() {
            return this.create();
          });
          it("shows date input ", function() {
            return expect(this.exists("input[type='date']")).to.be.ok;
          });
          return it("has proper class", function() {
            expect(this.find("input[type='date']").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("input[type='date']").hasClass("bootbox-input-date")).to.be.ok;
          });
        });
        describe("with default value", function() {
          beforeEach(function() {
            this.options.value = "17/08/2005";
            return this.create();
          });
          return it("has correct default value", function() {
            return expect(this.find("input[type='date']").val()).to.equal("17/08/2005");
          });
        });
        describe("with placeholder", function() {
          beforeEach(function() {
            this.options.placeholder = "enter the date";
            return this.create();
          });
          return it("has correct placeholder value", function() {
            return expect(this.find("input[type='date']").prop("placeholder")).to.equal("enter the date");
          });
        });
        return describe("with pattern", function() {
          beforeEach(function() {
            this.options.pattern = "\d{1,2}/\d{1,2}/\d{4}";
            return this.create();
          });
          return it("has correct pattern value", function() {
            return expect(this.find("input[type='date']").prop("pattern")).to.equal("\d{1,2}/\d{1,2}/\d{4}");
          });
        });
      });
      describe("setting inputType time", function() {
        beforeEach(function() {
          return this.options.inputType = "time";
        });
        describe("without default value", function() {
          beforeEach(function() {
            return this.create();
          });
          it("shows time input ", function() {
            return expect(this.exists("input[type='time']")).to.be.ok;
          });
          return it("has proper class", function() {
            expect(this.find("input[type='time']").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("input[type='time']").hasClass("bootbox-input-time")).to.be.ok;
          });
        });
        describe("with default value", function() {
          beforeEach(function() {
            this.options.value = "19:02";
            return this.create();
          });
          return it("has correct default value", function() {
            return expect(this.find("input[type='time']").val()).to.equal("19:02");
          });
        });
        describe("with placeholder", function() {
          beforeEach(function() {
            this.options.placeholder = "enter the time";
            return this.create();
          });
          return it("has correct placeholder value", function() {
            return expect(this.find("input[type='time']").prop("placeholder")).to.equal("enter the time");
          });
        });
        return describe("with pattern", function() {
          beforeEach(function() {
            this.options.pattern = "\d{1,2}/\d{1,2}/\d{4}";
            return this.create();
          });
          return it("has correct pattern value", function() {
            return expect(this.find("input[type='time']").prop("pattern")).to.equal("\d{1,2}/\d{1,2}/\d{4}");
          });
        });
      });
      return describe("setting inputType number", function() {
        beforeEach(function() {
          return this.options.inputType = "number";
        });
        describe("without default value", function() {
          beforeEach(function() {
            return this.create();
          });
          it("shows number input ", function() {
            return expect(this.exists("input[type='number']")).to.be.ok;
          });
          return it("has proper class", function() {
            expect(this.find("input[type='number']").hasClass("bootbox-input")).to.be.ok;
            return expect(this.find("input[type='number']").hasClass("bootbox-input-number")).to.be.ok;
          });
        });
        describe("with default value", function() {
          beforeEach(function() {
            this.options.value = "300";
            return this.create();
          });
          return it("has correct default value", function() {
            return expect(this.find("input[type='number']").val()).to.equal("300");
          });
        });
        return describe("with placeholder", function() {
          beforeEach(function() {
            this.options.placeholder = "enter the number";
            return this.create();
          });
          return it("has correct placeholder value", function() {
            return expect(this.find("input[type='number']").prop("placeholder")).to.equal("enter the number");
          });
        });
      });
    });
    return describe("callback tests", function() {
      describe("with a simple callback", function() {
        beforeEach(function() {
          this.callback = sinon.spy();
          this.dialog = bootbox.prompt({
            title: "What is your name?",
            callback: this.callback
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        describe("when entering no value in the text input", function() {
          describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
          return describe("when submitting the form", function() {
            beforeEach(function() {
              return this.dialog.find(".bootbox-form").trigger("submit");
            });
            it("invokes the callback with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
        });
        describe("when entering a value in the text input", function() {
          beforeEach(function() {
            return this.dialog.find(".bootbox-input").val("Test input");
          });
          describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("Test input");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
          return describe("when submitting the form", function() {
            beforeEach(function() {
              return this.dialog.find(".bootbox-form").trigger("submit");
            });
            it("invokes the callback with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("Test input");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
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
            return expect(this.callback).to.have.been.calledWithExactly(null);
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
        describe("when triggering the escape event", function() {
          beforeEach(function() {
            return this.dialog.trigger("escape.close.bb");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(null);
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
        return describe("when dismissing the dialog by clicking the close button", function() {
          beforeEach(function() {
            return this.dialog.find(".close").trigger("click");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(null);
          });
          return it("should hide the modal", function() {
            return expect(this.hidden).to.have.been.calledWithExactly("hide");
          });
        });
      });
      describe("with a callback which returns false", function() {
        beforeEach(function() {
          this.callback = sinon.stub();
          this.callback.returns(false);
          this.dialog = bootbox.prompt({
            title: "What is your name?",
            callback: this.callback
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        describe("when entering no value in the text input", function() {
          return describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("");
            });
            return it("should not hide the modal", function() {
              return expect(this.hidden).not.to.have.been.called;
            });
          });
        });
        describe("when entering a value in the text input", function() {
          beforeEach(function() {
            return this.dialog.find(".bootbox-input").val("Test input");
          });
          return describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("Test input");
            });
            return it("should not hide the modal", function() {
              return expect(this.hidden).not.to.have.been.called;
            });
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
            return expect(this.callback).to.have.been.calledWithExactly(null);
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
        describe("when triggering the escape event", function() {
          beforeEach(function() {
            return this.dialog.trigger("escape.close.bb");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(null);
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
        return describe("when dismissing the dialog by clicking the close button", function() {
          beforeEach(function() {
            return this.dialog.find(".close").trigger("click");
          });
          it("should invoke the callback", function() {
            return expect(this.callback).to.have.been.called;
          });
          it("with the correct value", function() {
            return expect(this.callback).to.have.been.calledWithExactly(null);
          });
          return it("should not hide the modal", function() {
            return expect(this.hidden).not.to.have.been.called;
          });
        });
      });
      describe("with a default value", function() {
        beforeEach(function() {
          this.callback = sinon.spy();
          this.dialog = bootbox.prompt({
            title: "What is your name?",
            value: "Bob",
            callback: this.callback
          });
          return this.hidden = sinon.spy(this.dialog, "modal");
        });
        it("populates the input with the default value", function() {
          return expect(this.dialog.find(".bootbox-input").val()).to.equal("Bob");
        });
        describe("when entering no value in the text input", function() {
          describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("Bob");
            });
          });
          return describe("when dismissing the dialog by clicking Cancel", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-default").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly(null);
            });
          });
        });
        return describe("when entering a value in the text input", function() {
          beforeEach(function() {
            return this.dialog.find(".bootbox-input").val("Alice");
          });
          describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("Alice");
            });
          });
          return describe("when dismissing the dialog by clicking Cancel", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-default").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly(null);
            });
          });
        });
      });
      describe("with a placeholder", function() {
        beforeEach(function() {
          this.callback = sinon.spy();
          return this.dialog = bootbox.prompt({
            title: "What is your name?",
            placeholder: "e.g. Bob Smith",
            callback: function() {
              return true;
            }
          });
        });
        return it("populates the input with the placeholder attribute", function() {
          return expect(this.dialog.find(".bootbox-input").attr("placeholder")).to.equal("e.g. Bob Smith");
        });
      });
      describe("with inputType select", function() {
        describe("without a default value", function() {
          beforeEach(function() {
            this.callback = sinon.spy();
            this.dialog = bootbox.prompt({
              title: "What is your IDE?",
              callback: this.callback,
              inputType: "select",
              inputOptions: [
                {
                  value: '#',
                  text: 'Choose one'
                }, {
                  value: 1,
                  text: 'Vim'
                }, {
                  value: 2,
                  text: 'Sublime Text'
                }, {
                  value: 3,
                  text: 'WebStorm/PhpStorm'
                }, {
                  value: 4,
                  text: 'Komodo IDE'
                }
              ]
            });
            return this.hidden = sinon.spy(this.dialog, "modal");
          });
          it("has correct number values in list", function() {
            return expect(this.find(".bootbox-input-select option").length).to.equal(5);
          });
          describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("#");
            });
          });
          return describe("when dismissing the dialog by clicking Cancel", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-default").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly(null);
            });
          });
        });
        return describe("with a default value", function() {
          beforeEach(function() {
            this.callback = sinon.spy();
            this.dialog = bootbox.prompt({
              title: "What is your IDE?",
              callback: this.callback,
              value: 1,
              inputType: "select",
              inputOptions: [
                {
                  value: '#',
                  text: 'Choose one'
                }, {
                  value: 1,
                  text: 'Vim'
                }, {
                  value: 2,
                  text: 'Sublime Text'
                }, {
                  value: 3,
                  text: 'WebStorm/PhpStorm'
                }, {
                  value: 4,
                  text: 'Komodo IDE'
                }
              ]
            });
            return this.hidden = sinon.spy(this.dialog, "modal");
          });
          it("specified option is selected", function() {
            return expect(this.dialog.find(".bootbox-input-select").val()).to.equal("1");
          });
          describe("when dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("1");
            });
          });
          describe("when dismissing the dialog by clicking Cancel", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-default").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly(null);
            });
          });
          return describe("when changing the selected option and dismissing the dialog by clicking OK", function() {
            beforeEach(function() {
              this.dialog.find(".bootbox-input-select").val(3);
              return this.dialog.find(".btn-primary").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("3");
            });
          });
        });
      });
      describe("with inputType email", function() {
        describe("without a default value", function() {
          beforeEach(function() {
            this.callback = sinon.spy();
            this.dialog = bootbox.prompt({
              title: "What is your email?",
              inputType: "email",
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
              return expect(this.callback).to.have.been.calledWithExactly("");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
          describe("when submitting the form", function() {
            beforeEach(function() {
              return this.dialog.find(".bootbox-form").trigger("submit");
            });
            it("invokes the callback with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
          return describe("when entering a value in the email input", function() {
            beforeEach(function() {
              return this.dialog.find(".bootbox-input-email").val("john@smith.com");
            });
            describe("when dismissing the dialog by clicking OK", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-primary").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly("john@smith.com");
              });
            });
            return describe("when dismissing the dialog by clicking Cancel", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-default").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(null);
              });
            });
          });
        });
        return describe("with a default value", function() {
          beforeEach(function() {
            this.callback = sinon.spy();
            this.dialog = bootbox.prompt({
              title: "What is your email?",
              inputType: "email",
              value: "john@smith.com",
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
              return expect(this.callback).to.have.been.calledWithExactly("john@smith.com");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
          describe("when submitting the form", function() {
            beforeEach(function() {
              return this.dialog.find(".bootbox-form").trigger("submit");
            });
            it("invokes the callback with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly("john@smith.com");
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
          return describe("when changing a value in the email input", function() {
            beforeEach(function() {
              return this.dialog.find(".bootbox-input-email").val("smith@john.com");
            });
            describe("when dismissing the dialog by clicking OK", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-primary").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly("smith@john.com");
              });
            });
            return describe("when dismissing the dialog by clicking Cancel", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-default").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(null);
              });
            });
          });
        });
      });
      return describe("with input type checkbox", function() {
        describe("without a default value", function() {
          beforeEach(function() {
            this.callback = sinon.spy();
            this.dialog = bootbox.prompt({
              title: "What is your IDE?",
              inputType: 'checkbox',
              inputOptions: [
                {
                  value: 1,
                  text: 'Vim'
                }, {
                  value: 2,
                  text: 'Sublime Text'
                }, {
                  value: 3,
                  text: 'WebStorm/PhpStorm'
                }, {
                  value: 4,
                  text: 'Komodo IDE'
                }
              ],
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
            it("with an undefined value", function() {
              return expect(this.callback).to.have.been.calledWithExactly([]);
            });
            return it("should hide the modal", function() {
              return expect(this.hidden).to.have.been.calledWithExactly("hide");
            });
          });
          return describe("when dismissing the dialog by clicking Cancel", function() {
            beforeEach(function() {
              return this.dialog.find(".btn-default").trigger("click");
            });
            it("should invoke the callback", function() {
              return expect(this.callback).to.have.been.called;
            });
            return it("with the correct value", function() {
              return expect(this.callback).to.have.been.calledWithExactly(null);
            });
          });
        });
        return describe("with default value", function() {
          describe("one value checked", function() {
            beforeEach(function() {
              this.callback = sinon.spy();
              this.dialog = bootbox.prompt({
                title: "What is your IDE?",
                callback: this.callback,
                value: 2,
                inputType: "checkbox",
                inputOptions: [
                  {
                    value: 1,
                    text: 'Vim'
                  }, {
                    value: 2,
                    text: 'Sublime Text'
                  }, {
                    value: 3,
                    text: 'WebStorm/PhpStorm'
                  }, {
                    value: 4,
                    text: 'Komodo IDE'
                  }
                ]
              });
              return this.hidden = sinon.spy(this.dialog, "modal");
            });
            it("specified checkbox is checked", function() {
              return expect(this.dialog.find("input:checkbox:checked").val()).to.equal("2");
            });
            describe("when dismissing the dialog by clicking OK", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-primary").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(["2"]);
              });
            });
            describe("when dismissing the dialog by clicking Cancel", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-default").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(null);
              });
            });
            describe("when changing the checked option and dismissing the dialog by clicking Cancel", function() {
              beforeEach(function() {
                this.dialog.find("input:checkbox:checked").prop('checked', false);
                this.dialog.find("input:checkbox[value=3]").prop('checked', true);
                return this.dialog.find(".btn-default").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(null);
              });
            });
            return describe("when changing the selected option and dismissing the dialog by clicking OK", function() {
              beforeEach(function() {
                this.dialog.find("input:checkbox:checked").prop('checked', false);
                this.dialog.find("input:checkbox[value=3]").prop('checked', true);
                return this.dialog.find(".btn-primary").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(["3"]);
              });
            });
          });
          return describe("multiple value checked", function() {
            beforeEach(function() {
              this.callback = sinon.spy();
              this.dialog = bootbox.prompt({
                title: "What is your IDE?",
                callback: this.callback,
                value: [2, 3],
                inputType: "checkbox",
                inputOptions: [
                  {
                    value: 1,
                    text: 'Vim'
                  }, {
                    value: 2,
                    text: 'Sublime Text'
                  }, {
                    value: 3,
                    text: 'WebStorm/PhpStorm'
                  }, {
                    value: 4,
                    text: 'Komodo IDE'
                  }
                ]
              });
              return this.hidden = sinon.spy(this.dialog, "modal");
            });
            it("specified checkboxes are checked", function() {
              var checked,
                _this = this;
              checked = [];
              this.dialog.find("input:checkbox:checked").each(function(foo, bar) {
                return checked.push($(bar).val());
              });
              return expect(checked).to.deep.equal(["2", "3"]);
            });
            describe("when dismissing the dialog by clicking OK", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-primary").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(["2", "3"]);
              });
            });
            describe("when dismissing the dialog by clicking Cancel", function() {
              beforeEach(function() {
                return this.dialog.find(".btn-default").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(null);
              });
            });
            describe("when changing the checked options and dismissing the dialog by clicking Cancel", function() {
              beforeEach(function() {
                this.dialog.find("input:checkbox:checked").prop('checked', false);
                this.dialog.find("input:checkbox[value=1]").prop('checked', true);
                this.dialog.find("input:checkbox[value=4]").prop('checked', true);
                return this.dialog.find(".btn-default").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(null);
              });
            });
            return describe("when changing the checked options and dismissing the dialog by clicking OK", function() {
              beforeEach(function() {
                this.dialog.find("input:checkbox:checked").prop('checked', false);
                this.dialog.find("input:checkbox[value=1]").prop('checked', true);
                this.dialog.find("input:checkbox[value=4]").prop('checked', true);
                return this.dialog.find(".btn-primary").trigger("click");
              });
              it("should invoke the callback", function() {
                return expect(this.callback).to.have.been.called;
              });
              return it("with the correct value", function() {
                return expect(this.callback).to.have.been.calledWithExactly(["1", "4"]);
              });
            });
          });
        });
      });
    });
  });

}).call(this);
