import Route from '@ember/routing/route';
export default Route.extend({
  titleToken() {
    switch (this.get('params.notification_state')) {
      case 'unread':
        return this.l10n.t('Unread');
      case 'all':
        return this.l10n.t('All');
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];

    let data = {
      unread: false
    };

    if (params.notification_state === 'unread') {
      filterOptions = [
        {
          name : 'is-read',
          op   : 'eq',
          val  : false
        }
      ];
      data.unread = true;
    }

    data.notifications = this.infinity.model('notifications', {
      perPage      : 10,
      startingPage : 1,
      sort         : '-received-at',
      include      : 'notification-actions',
      store        : this.authManager.currentUser,
      filter       : filterOptions,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]'
    });

    return data;
  }
});
