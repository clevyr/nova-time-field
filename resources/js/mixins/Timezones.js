const Timezones = {
    computed: {
        timezoneAdjustments() {
            return this.field.timezoneAdjustments || false;
        },

        /**
         * Get the user's local timezone.
         */
        userTimezone: function userTimezone() {
            return Nova.config.userTimezone ? Nova.config.userTimezone : moment.tz.guess();
        },
    },
    methods: {
        /**
         * Convert the given localized date time string to the application's timezone.
         */
        toAppTimezone: function toAppTimezone(value) {
            return value ? moment.tz(value, 'h:mm A', this.userTimezone).clone().tz(Nova.config.timezone).format('h:mm A') : value;
        },

        /**
         * Convert the given application timezone date time string to the local timezone.
         */
        fromAppTimezone: function fromAppTimezone(value) {
            if (!value) {
                return value;
            }

            if (this.field.timezoneAdjustment) {
                return moment.utc(value, 'h:mm A')
                    .clone()
                    .add(this.field.timezoneAdjustment, 'minutes')
                    .format('h:mm A');
            }

            return moment.tz(value, 'h:mm A', Nova.config.timezone).clone().tz(this.userTimezone).format('h:mm A');
        },
    }
}

export default Timezones
