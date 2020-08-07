

export default {
  'type': {
    'organisation': {
      'name': 'Name',
      'email': 'E-Mail',
      'website': 'Website',
      'phone': 'Phone',
    },
    'users': {
      'name': 'Name',
      'email': 'E-Mail',
      'phone': 'Phone',
      'mobile': 'Mobile',
      'comment': 'Notes',
      'password': 'Password',
      'role_id': 'Role',
      'organisation_id': 'Organisation',
      'avatar': 'Your picture',
      'organisation': {
        'name': 'Organisation',
      },
      'role': {
        'name': 'Role',
      },
      'lang': 'Language',
      'lang-options': {
        'de': 'German',
        'en': 'English',
      }
    },
    'project': {
      'name': 'Name',
      'description': 'Description',
      'links': 'Links',
      'source': 'Source',
      'effort_unit': 'Effort unit',
      'starts_at': 'Starts',
      'ends_at': 'End',
      'planned': 'Budget',
      'used': 'Progress',
      'price': 'Price',
      'state': 'State',
      'state-options': {
        'LEAD': 'New',
        'ONHOLD': 'On hold',
        'INCEPTION': 'Inception', 
        'ESTIMATION': 'Estimation',
        'WAITING': 'Waiting',
        'NEGOTIATION': 'Negoatiation',
        'ACCEPTED': 'Accepted',
        'REJECTED': 'Rejected',
        'MAINTENANCE': 'Maintenance',
        'CLOSED': 'Closed',      
      },
      'accepted': 'Accepted',
      'customer_id': 'Customer',
      'contact': 'Contact',
      'customer': {
        'name': 'Name',
      },
      'last_offer': {
        'price': 'Last Offer',
      },
    },
    'allocation': {
      'user_id': 'User',
      'role': 'Role',
      'role-options': {
        'Sales': 'Sales',
        'Mgmt': 'Projectmgmt',
        'Dev': 'Development',
        'QA': 'Test',
        'Customer': 'Customer',
      },
      'parttime': 'Part time',
      'salary': 'Salary',
      'type': 'Type',
      'type-options': {
        'ILL': 'Ill',
        'HOLIDAY': 'Holiday',
        'CONTRACT': 'Contract',
      },
      'from': 'From',
      'to': 'To',
      'comment': 'Comment',
    },
    'position': {
      'no': 'No',
      'name': 'Name',
      'comment': 'Comment',
      'planned': 'Planned',
      'price': 'Price',
      'optional': 'Optional',
      'accepted': 'Accepted',
    },
    'task': {
      'name': 'New task',
      'description': 'Description',
      'percent': 'Percent',
      'purchased': 'Purchased',
      'price': 'Supplier price',
      'supplier': 'Supplier',
      'position': 'Position',
      'planned': 'Planned',
      'due_at': 'Due',
      'user_id': 'Responsible',
      'state': 'State',
      'state-options': {
        'NEW': 'Not approved',
        'APPROVED': 'Backlog',
        'PLANNED': 'Sprint',
        'STARTED': 'Today',
        'IMPLEMENTED': 'Implemented',
        'TESTED': 'Testet',
        'DEPLOYED': 'Installed',
      },
      'used': 'Progress',
    },
    'estimation': {
      'planned': 'Estimation',
      'comment': 'Estimation comment',
    },
    'action': {
      'project': {
        'name': 'Project',
        'customer_id': 'Customer',
        'id': 'Project',
      },
      'task': {
        'name': 'Task',
        'state': 'State',
        'project': {
          'name': 'Project',
          'customer': {
            'name': 'Customer',
          }
        },
      },
      'user': {
        'name': 'User',
      },
      'action': {
        'user_id': 'User',
      },
      'from': 'Date',
      'fromCustom': 'Custom date',
      'used': 'Booked',
      'comment': 'Comment',
    },
    'accounting': {
      'name': 'Name',
      'price': 'Price',
      'state': 'State',
      'state-options': {
        'NEW': 'New',
        'SENT': 'Sent',
        'ACCEPTED': 'Accepted',
        'REJECTED': 'Rejected',
        'PAYED': 'Payed',
      },
      'approved_at': 'Approved/rejected',
      'pricePerUnit': 'Unit price',
      'percentBuffer': 'Percent buffer',
      'rounding': 'Rounded',
      'invoicing': 'Invoicing',
      'invoicing-options': {
        'NONE': 'Time/Material',
        'ONE': 'One invoice',
        '30-40-30': '30/40/30% Invoices',
      },
      'reference': {
        'name' : 'Offer'
      }
    },
  },
  'ui': {
    'auth': {
      'profile': 'My Profile',
      'logout': 'Log out',
    },
    'home': {
      'welcome': 'Hello {user}!',
      'tasks': 'Tasks',
      'today': 'Today',
      'upcoming': 'Upcoming',
      'time': 'Book time',
      'notask': 'Select a task',
      'projects': 'Your projects',
      'otherTasks' : 'Other tasks',
    },
    'list': {
      'actions': 'Actions',
      'add': 'Add',
      'addGroup': 'Add section',
      'create': 'New row',
      'edit': 'Edit row',
      'delete': 'Delete row',
      'showFilter': 'Filter',
      'close': 'Close',
      'search': 'Search',
      'empty': 'Choose'
    },
    'detail': {
      'cancel': 'Cancel',
      'save': 'Save',
      'details': 'Details',
    },
    'button': {
      'Send': 'Send',
      'Copy': 'Copy',
      'Closed': 'Installed',
      'Approve': 'Approve',
      'Plan': 'Upcoming',
      'Start': 'Today',
      'Reset': 'Reset',
      'Tested': 'Tested',
      'Ready': 'Completed',
      'Accept': 'Accept',
      'Reject': 'Reject',
      'Maintenance': 'Maintenance',
      'Reopen': 'Reopen',
    },
    'daterange': {
      'today': 'Today',
      'yesterday': 'Yesterday',
      'this-week': 'This week',
      'last-week': 'Last week',
      'this-month': 'This month',
      'last-month': 'Last month',
      'this-year': 'This year',
      'last-year': 'Last year',
      'custom': 'Custom'
    },
    'leads': {
      'open': 'Open',
      'accepted': 'Accepted',
      'rejected': 'Rejected',
      'template': 'Templates',
      'reset': 'Reset',
      'istemplate': 'Save as template',
      'notemplate': 'No template',
      'planned': 'Currently planned',
      'timeline': {
        'add': 'New sales task',
        'save': 'Save',
        'close': 'Complete',
      },
      'tasks': {
        'percent': 'Buffer in % on ALL positions.',
        'purchased': 'This is article is purchased.',
        'readonly': 'Readonly.',
        'alreadysent': 'Offer is already sent.',
      },
      'offer': {
        'export': 'Export to Word',
        'total': 'Total',
        'close': 'Close',
      }
    },
    'project': {
      'accepted': 'In work',
      'maintenance': 'In maintenance',
      'closed': 'Closed',
      'tasks': {
        'none': 'Group:',
        'category': 'Category',
        'user': 'Responsible',
        'position': 'Offer',
      },
    },
    'timeline': {
      'younow': 'You, now',
      'comment': 'What have you done?',
      'save': 'Save',
      'start': 'Start',
      'close': 'Complete',
      'reopen': 'Reopen',
      'tested': 'Tested',
      'deployed': 'Installed',
      'detail': 'Details',
      'history': 'History',
      'hours': 'Hour | Hours'
    },
    'planning': {
      'edit-title': 'Change allocation for {user}',
      'create-title': 'Create allocation for {user}',
      'quarter': 'Hour',
      'day': 'Day',
      'week': 'Week',
      'month': 'Month',
      'type': 'Type or project',
      'standard': 'Type',
      'projects': 'Project|Projects',
      'holiday': 'Holiday',
      'ill': 'Ill',
      'parttime': 'Part time',
      'date': 'From-to',
      'cancel': 'Cancel',
      'save': 'Save',
      'delete': 'Delete',
      'create': 'Create',
      'staffing': 'Staffing',
      'workdays': 'Workdays',
      'total': 'Total',
      'planned': 'Planned',
      'buffer': 'Buffer',
      'exit': {
        'title': 'You have unsaved changes.',
        'warning': 'Warning!',
        'confirm': 'Okay - throw them away.',
        'cancel': 'Uh! Back to planning.',
      },
    },
    'gantt': {
      'date': 'Date'
    },
    'kanban': {
      'NEW': 'Not approved',
      'APPROVED': 'Backlog',
      'PLANNED': 'Sprint',
      'STARTED': 'Today',
      'IMPLEMENTED': 'Implemented',
      'TESTED': 'Testet',
      'DEPLOYED': 'Installed',

    },
    'user': {
      'Details': 'Details',
      'Timeline': 'Timesheet',
      'Contracts': 'Contracts',
      'TimesOff': 'Times off',
    },
},
  'route': {
    'All': 'All',
    'Home': 'Home',
    'Detail': 'Detail',
    'Users': 'Users',
    'User': 'User',
    'Sales': 'Sales',
    'Leads': 'Leads',
    'List': 'List',
    'Funnel': 'Funnel',
    'Planning': 'Planning',
    'Projects': 'Projects',
    'Roles': 'Roles',
    'Lead-Detail': 'Detail',
    'Timeline': 'Timeline',
    'Lead-Timeline': 'Timeline',
    'Lead-Tasks': 'Tasks',
    'Tasks': 'Tasks',
    'Offers': 'Offers',
    'Offer': 'Offer',
    'Invoices': 'Invoices',
    'Invoice': 'Invoice',
    'Positions': 'Positions',
    'Organisations': 'Customers',
    'Organisation': 'Customer',
    'Project-Detail': 'Detail',
    'Project-Tasks': 'Tasks',
    'Team': 'Team',
    'Board': 'Board',
    'State': 'Burndown',
    'Project-Timeline': 'Timesheet',
    'Task': 'Task',
    'Work': 'Work',
    'Backoffice': 'Backoffice',
    'Hours': 'Working hours',
  }
}