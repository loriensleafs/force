Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
HeroUnitView = require './hero_unit_view.coffee'
HomeAuthRouter = require './auth_router.coffee'
FeaturedArtworksView = require '../components/featured_artworks/view.coffee'
splitTest = require '../../../components/split_test/index.coffee'
{ setupFilter } = require '../../../components/filter2/index.coffee'
aggregationParams = require '../aggregations.coffee'

module.exports.HomeView = class HomeView extends Backbone.View
  initialize: (options) ->
    @user = CurrentUser.orNull()

    # Set up a router for the /log_in /sign_up and /forgot routes
    new HomeAuthRouter
    Backbone.history.start pushState: true

    @setupHeroUnits()
    @setupFavoritesOnboardingModal()
    if splitTest('homepage_contents').outcome() is 'featured' or @user
      @renderArtworks()

    @setupArtworkFilter() if splitTest('homepage_contents').outcome() is 'artworks'

  setupHeroUnits: ->
    new HeroUnitView el: @$el, $mainHeader: $('#main-layout-header')

  setupFavoritesOnboardingModal: ->
    return unless @user and 'Set Management' in @user.get('lab_features')
    return if parseInt(Cookies.get 'favorites_onboarding_dismiss_count') >= 2
    OnboardingModal = require '../../../components/favorites2/client/onboarding_modal.coffee'
    new OnboardingModal width: 1000

  setupArtworkFilter: ->
    setupFilter
      el: $ '#home-artworks-filter'
      aggregations: aggregationParams
      startHistory: no
      includeFixedHeader: no

    scrollFrame '#home-artworks a'

  renderArtworks: ->
    subView = new FeaturedArtworksView user: @user
    subView.collection.fetch()
    @$('#home-featured-artworks-section').html subView.render().$el

module.exports.init = ->
  new HomeView el: $('body')
  require './analytics.coffee'
