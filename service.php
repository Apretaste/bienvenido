<?php

use Apretaste\Request;
use Apretaste\Response;

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
		$response->setComponent("Main");
	}
}
