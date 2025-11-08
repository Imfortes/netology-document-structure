document.addEventListener('DOMContentLoaded', function() {
    const tooltipElements = document.querySelectorAll('.has-tooltip');

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    tooltipElements.forEach(element => {
        element.addEventListener('click', function(event) {
            event.preventDefault();

            if (this.classList.contains('tooltip-active')) {
                this.classList.remove('tooltip-active');
                tooltip.classList.remove('tooltip_active');
                return;
            }

            tooltipElements.forEach(el => el.classList.remove('tooltip-active'));

            tooltip.textContent = this.getAttribute('title');

            this.classList.add('tooltip-active');
            tooltip.classList.add('tooltip_active');

            positionTooltip(this, tooltip);
        });
    });

    function positionTooltip(element, tooltip) {
        const rect = element.getBoundingClientRect();
        const position = element.getAttribute('data-position') || 'bottom';

        switch (position) {
            case 'top':
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
                break;
            case 'left':
                tooltip.style.left = (rect.left - tooltip.offsetWidth - 5) + 'px';
                tooltip.style.top = rect.top + 'px';
                break;
            case 'right':
                tooltip.style.left = (rect.right + 5) + 'px';
                tooltip.style.top = rect.top + 'px';
                break;
            case 'bottom':
            default:
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.bottom + 5) + 'px';
                break;
        }
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.has-tooltip') && !event.target.closest('.tooltip')) {
            tooltipElements.forEach(el => el.classList.remove('tooltip-active'));
            tooltip.classList.remove('tooltip_active');
        }
    });
});