(function() {
  describe("bootbox locales", function() {
    beforeEach(function() {
      return this.setLocale = function(locale) {
        var d1, d2;
        bootbox.setDefaults({
          locale: locale
        });
        d1 = bootbox.alert("foo");
        d2 = bootbox.confirm("foo", function() {
          return true;
        });
        return this.labels = {
          ok: d1.find(".btn:first").text(),
          cancel: d2.find(".btn:first").text(),
          confirm: d2.find(".btn:last").text()
        };
      };
    });
    describe("Invalid locale", function() {
      beforeEach(function() {
        return this.setLocale("xx");
      });
      it("shows the default OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the default CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Cancel");
      });
      return it("shows the default CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("OK");
      });
    });
    describe("English", function() {
      beforeEach(function() {
        return this.setLocale("en");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Cancel");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("OK");
      });
    });
    describe("French", function() {
      beforeEach(function() {
        return this.setLocale("fr");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Annuler");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("D'accord");
      });
    });
    describe("German", function() {
      beforeEach(function() {
        return this.setLocale("de");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Abbrechen");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Akzeptieren");
      });
    });
    describe("Spanish", function() {
      beforeEach(function() {
        return this.setLocale("es");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Cancelar");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Aceptar");
      });
    });
    describe("Portuguese", function() {
      beforeEach(function() {
        return this.setLocale("br");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Cancelar");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Sim");
      });
    });
    describe("Dutch", function() {
      beforeEach(function() {
        return this.setLocale("nl");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Annuleren");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Accepteren");
      });
    });
    describe("Russian", function() {
      beforeEach(function() {
        return this.setLocale("ru");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Отмена");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Применить");
      });
    });
    describe("Italian", function() {
      beforeEach(function() {
        return this.setLocale("it");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Annulla");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Conferma");
      });
    });
    describe("Polish", function() {
      beforeEach(function() {
        return this.setLocale("pl");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Anuluj");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Potwierdź");
      });
    });
    describe("Danish", function() {
      beforeEach(function() {
        return this.setLocale("da");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Annuller");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Accepter");
      });
    });
    describe("Chinese", function() {
      describe("Taiwan", function() {
        beforeEach(function() {
          return this.setLocale("zh_TW");
        });
        it("shows the correct OK translation", function() {
          return expect(this.labels.ok).to.equal("OK");
        });
        it("shows the correct CANCEL translation", function() {
          return expect(this.labels.cancel).to.equal("取消");
        });
        return it("shows the correct CONFIRM translation", function() {
          return expect(this.labels.confirm).to.equal("確認");
        });
      });
      return describe("China", function() {
        beforeEach(function() {
          return this.setLocale("zh_CN");
        });
        it("shows the correct OK translation", function() {
          return expect(this.labels.ok).to.equal("OK");
        });
        it("shows the correct CANCEL translation", function() {
          return expect(this.labels.cancel).to.equal("取消");
        });
        return it("shows the correct CONFIRM translation", function() {
          return expect(this.labels.confirm).to.equal("确认");
        });
      });
    });
    describe("Norwegian", function() {
      beforeEach(function() {
        return this.setLocale("no");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Avbryt");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("OK");
      });
    });
    describe("Swedish", function() {
      beforeEach(function() {
        return this.setLocale("sv");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("OK");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Avbryt");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("OK");
      });
    });
    describe("Latvian", function() {
      beforeEach(function() {
        return this.setLocale("lv");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("Labi");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Atcelt");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Apstiprināt");
      });
    });
    describe("Lithuanian", function() {
      beforeEach(function() {
        return this.setLocale("lt");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("Gerai");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("Atšaukti");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Patvirtinti");
      });
    });
    describe("Turkish", function() {
      beforeEach(function() {
        return this.setLocale("tr");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("Tamam");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("İptal");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("Onayla");
      });
    });
    return describe("Hebrew", function() {
      beforeEach(function() {
        return this.setLocale("he");
      });
      it("shows the correct OK translation", function() {
        return expect(this.labels.ok).to.equal("אישור");
      });
      it("shows the correct CANCEL translation", function() {
        return expect(this.labels.cancel).to.equal("ביטול");
      });
      return it("shows the correct CONFIRM translation", function() {
        return expect(this.labels.confirm).to.equal("אישור");
      });
    });
  });

}).call(this);
