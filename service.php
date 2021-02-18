<?php

use Apretaste\Core;
use Apretaste\Person;
use Apretaste\Request;
use Apretaste\Response;
use Apretaste\Tutorial;
use Framework\Config;
use Framework\Database;

class Service
{
	/**
	 * Main entry point
	 *
	 * @param Request
	 * @param Response
	 */
	public function _main(Request $request, Response $response)
	{
		// check if the profile has not been updated
		$profileNotUpdated = empty($request->person->lastUpdateDate);

		// take the wizard or tutorial
		if($profileNotUpdated) {
			return $this->_wizard($request, $response);
		} else {
			return $this->_tutorial($request, $response);
		}
	}

	/**
	 * A wizard to help you configure your profile
	 *
	 * @param Request
	 * @param Response
	 */
	public function _wizard(Request $request, Response $response)
	{
		// create a subset of the person object
		$person = [
			"username" => $request->person->username,
			"province" => $request->person->gender,
			"gender" => $request->person->gender,
			"avatar" => $request->person->avatar,
			"avatarColor" => $request->person->avatarColor
		];

		// get influencers list
		$influencers = Database::queryCache("
			SELECT B.username, B.avatar, B.about_me, A.first_category, A.second_category 
			FROM influencers A
			JOIN person B 
			ON A.person_id = B.id
			AND B.active = 1");

		// get list of influencer categories
		$categories = [];
		foreach ($influencers as $item) {
			$categories[$item->first_category] = Core::$influencerCategories[$item->first_category];
			$categories[$item->second_category] = Core::$influencerCategories[$item->second_category];
		}

		// get the content
		$content = [
			"person" => $person,
			"influencers" => $influencers,
			"categories" => $categories
		];

		// send data to the view
		$response->setCache();
		$response->setTemplate("wizard.ejs", $content);
	}

	/**
	 * Update a use profile and favorites
	 *
	 * @param Request
	 * @param Response
	 */
	public function _update(Request $request, Response $response)
	{
		// get SQL array of favorites
		$favorites = [];
		foreach ($request->input->data->favorites as $item) {
			$favorites[] = "({$request->person->id}, '$item')";
		}

		// replace all favorites
		$favoritesSQL = implode(',', $favorites);
		Database::query("
			START TRANSACTION;
			DELETE FROM service_favorite WHERE person_id = {$request->person->id};
			INSERT INTO service_favorite (person_id, service) VALUES $favoritesSQL;
			COMMIT;");

		// update profile
		Person::update($request->person->id, $request->input->data->person);

		// redirect to the tutorial
		return $this->_tutorial($request, $response);
	}

	/**
	 * A list of stuff to-do in the app
	 *
	 * @param Request
	 * @param Response
	 */
	public function _tutorial(Request $request, Response $response)
	{
		// get the tutorial as object of booleans
		$tutorial = Tutorial::get($request->person->id);

		// get link to the home service
		$isVersion7 = $request->input->osType == 'web' || $request->input->appVersion >= 7;
		$homeService = $isVersion7 ? 'INICIO' : 'SERVICIOS';

		// get the content
		$content = [
			"tutorialId" => Config::pick('general')['tutorial_id'],
			"tutorial" => $tutorial,
			"osType" => $request->input->osType,
			"method" => $request->input->method,
			"homeService" => $homeService
		];

		// send data to the view
		$response->setCache('year');
		$response->setTemplate("tutorial.ejs", $content);
	}
}
