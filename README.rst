|Build Status| |npm_version| |license| |semantic-release|

frontend-app-report-viewer
==========================

Introduction
------------

This MFE allows an instructor to view all the reports they have access to in the browser,
in an in-browser CSV Viewer.

.. note::

   This MFE requires APIs in edx-platform that are introduced in
   `PR#27313 <https://github.com/edx/edx-platform/pull/27313>`_. It should be
   available in releases after Maple.

Installation with devstack
--------------------------

Follow these steps to provision, run, and enable an instance of the report-viewer MFE for local development via the
`official Open edX devstack
<https://edx.readthedocs.io/projects/edx-installing-configuring-and-running/en/latest/installation/index.html>`_.

1. Clone this repo somewhere in your projects directory.

   .. code-block::

      git clone https://github.com/open-craft/frontend-app-report-viewer.git

2. Install the npm dependencies:

   .. code-block::

      npm install

2. Start the MFE:

   .. code-block::

      npm start

3. Make sure that the LMS is also up and running in the devstack.


The app should now be available at `<http://localhost:4080>`_.

Installation with edx/configuration
-----------------------------------

To deploy this with `edx/configuration` you need to provide configuration for
the [mfe_deployer role](https://github.com/edx/configuration/tree/master/playbooks/roles/mfe_deployer).
