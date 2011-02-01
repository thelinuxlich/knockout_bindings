/** Binding para validar o valor antes de aplicá-lo */
ko.bindingHandlers.valueWithAutoValidation = {
  init: ko.bindingHandlers.value.init,
  update: function(element) {
    ko.bindingHandlers.value.update.apply(this, arguments);
    if(element.form)
     $(element).valid();
  }
};
/** Binding para criar uma máscara no campo */
ko.bindingHandlers.mask = {
  init: function(element, valueAccessor) {
	var options = valueAccessor();
	var mask = "";
	if(options === "date")
	    mask = "99/99/9999";
	else if(options === "time")
	    mask = "99:99";
	$(element).mask(mask);
  }
};
/** Binding para estilizar botões */
ko.bindingHandlers.jqButton = {
    init: function(element, valueAccessor) {
	    var options = valueAccessor();
	    $(element).button(options);
    }
};
/** Binding para habilitar acordeão */
ko.bindingHandlers.jqAccordion = {
    init: function(element, valueAccessor) {
        var options = valueAccessor();
	    $(element).accordion(options);
	    $(element).bind("valueChanged",function(){
	       ko.bindingHandlers.jqAccordion.update(element,valueAccessor);
	    });
    },
    update: function(element,valueAccessor) {
        var options = valueAccessor();
        $(element).accordion('destroy').accordion(options);
    }
};
/** Binding para habilitar multiselect */
ko.bindingHandlers.jqMultiSelect = {
    init: function(element, valueAccessor,allBindingsAccessor,viewModel) {
        var defaults = {
            click: function(event,ui) {
                var selected_options = $.map($(element).multiselect("getChecked"),function(a) {return $(a).val()});
                allBindingsAccessor()['selectedOptions'](selected_options);
            }
        };
        var options = $.extend(defaults,valueAccessor());
        allBindingsAccessor()['options'].subscribe(function(value) {
            ko.bindingHandlers.jqMultiSelect.regenerateMultiselect(element,options,viewModel);
        });
        allBindingsAccessor()['selectedOptions'].subscribe(function(value) {
            ko.bindingHandlers.jqMultiSelect.regenerateMultiselect(element,options,viewModel);
        });
    },
    regenerateMultiselect: function(element,options,viewModel) {
        if($(element).next().hasClass("ui-multiselect")) {
            setTimeout(function() {
                return $(element).multiselect("refresh").multiselectfilter({
                        label: options['filterLabel'] || "Search: "
                    });;
            }, 0);
        } else {
            setTimeout(function() {
                if(options['filter'] === true) {
                    $(element).multiselect(options).multiselectfilter({
                        label: options['filterLabel'] || "Search: "
                    });
                } else {
                    $(element).multiselect(options);
                }
                if(options['noChecks'] === true) {
                    $(element).next().next().find(".ui-helper-reset:first").remove();
                }
            },0);
        }
    }
};
/** Binding para executar validação em um formulário */
ko.bindingHandlers.jqValidate = {
    init: function(element, valueAccessor) {
	    var options = valueAccessor();
	    $(element).validate(options);
    }
};
/** Binding para criar janelas de diálogo */
ko.bindingHandlers.jqDialog = {
    init: function(element, valueAccessor) {
        var defaults = {
            modal: true,
	        autoOpen: false,
	        closeOnEscape: false
	    }
	    var options = $.extend(defaults,valueAccessor());
	    $(element).dialog(options);
    }
};

