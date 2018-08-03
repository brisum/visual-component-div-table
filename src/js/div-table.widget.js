define([
    'jquery',
    'lib-widget',
    'lib-require-init'
],
function(
    $,
    Widget,
    RequireInit
) {
    class DivTableWidget extends Widget {
        _init() {
            super._init();

            let self = this;

            this.$element.on('click', '.div-td.tcol-toggle', function () {
                let $tr = $(this).closest('.div-tr');

                if ($tr.hasClass('collapse')) {
                    $tr.removeClass('collapse');
                    $tr.find('.secondary-columns').slideUp();
                } else {
                    if (!$tr.find('.secondary-columns').length) {
                        self.createSecondaryColumnsBlock($tr);
                    }
                    $tr.addClass('collapse');
                    $tr.find('.secondary-columns').slideDown();
                }
            });
        }

        createSecondaryColumnsBlock($tr) {
            if ($tr.find('.secondary-columns').length) {
                $tr.find('.secondary-columns').remove();
            }

            let $secondaryColumns = $('<div class="secondary-columns"></div>');

            $tr.find('.tcol-secondary').each(function (i, element) {
                $secondaryColumns.append($(element).clone());
            });
            $tr.append($('<div class="clearfix tcol-secondary-separator"></div>'));
            $tr.append($secondaryColumns);

            new RequireInit($tr.find('.secondary-columns'));
        }
    }

    return DivTableWidget;
});
